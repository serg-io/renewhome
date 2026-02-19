import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const fullName = core.getInput('applicant_full_name');
    const userName = core.getInput('applicant_github_username');
    const token = core.getInput('token');
    // kebab case regex stolen from https://stackoverflow.com/questions/35096257/regular-rxpression-to-convert-a-camel-case-string-into-kebab-case
    const kebabRegexp = /[\W_]+|(?<=[a-z0-9])(?=[A-Z])/g;
    const safeFullName = fullName.replace(kebabRegexp, '-').toLocaleLowerCase();
    const newRepoName = `${github.context.repo.repo.replace('-template', '')}__${safeFullName}`;
    core.debug(`Duplicating repo to [${github.context.repo.owner}/${newRepoName}]`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    const octo = github.getOctokit(token);

    const repo = await octo.rest.repos
      .createUsingTemplate({
        name: newRepoName,
        template_owner: github.context.repo.owner,
        template_repo: github.context.repo.repo,
        include_all_branches: false,
        private: true,
        description: `Renew Home Engineering Assessment for ${fullName}`,
        owner: github.context.repo.owner,
      })
      .then(({data}) => data)
      .catch(e => {
        // there's a chance the repo exists already, so try searching for it and return that instead
        return octo.rest.repos
          .get({
            owner: github.context.repo.owner,
            repo: newRepoName,
          })
          .then(({data}) => data);
      });

    core.setOutput('repo', repo.full_name);

    // might need to do something silly to give the new repo access to packages
    // await octo.request("POST orgs/ohmconnect/packages/container/full-stack-assessment-devcontainer/settings/update_actions_access")

    if (userName) {
      const user = await octo.rest.users.getByUsername({username: userName}).then(({data}) => data);
      core.info(`Confirmed user [${userName}] is ${user.name}`);
      await octo.rest.repos
        .addCollaborator({
          owner: github.context.repo.owner,
          repo: repo.name,
          username: userName,
          permission: 'push',
        })
        .then(x => {
          core.info(
            `Added user [${x.data.invitee?.login}] as ${x.data.permissions} on [${x.data.repository.full_name}] `,
          );
        })
        .catch(e => {
          core.warning(`Failed to add [${userName}] to repo: ${e}`);
          core.warning(`Continuing anyway ¯\_(ツ)_/¯`);
        });
    }

    // add other teammembers to the repo
    await octo.rest.teams
      .addOrUpdateRepoPermissionsInOrg({
        org: github.context.repo.owner,
        repo: repo.name,
        owner: github.context.repo.owner,
        team_slug: 'hiring-assessment',
        permission: 'admin',
      })
      .catch(e => {
        core.warning(`Failed to add hiring-assessment group to [${repo.full_name}]`);
      })
      .then(x => {
        core.info(`Added hiring assessment group on [${repo.full_name}]`);
      });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
