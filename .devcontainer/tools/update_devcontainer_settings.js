/**
 * overwrite the machine settings with the current settings key from devcontainer.json
 */

const fs = require("fs");
const path = require("path");
const process = require("process");
const jsonc = require("jsonc-parser");

workspaceRoot = process.cwd();
devcontainerJsonPath = path.join(
  workspaceRoot,
  ".devcontainer",
  "devcontainer.json"
);
devcontainerJsonRaw = fs.readFileSync(devcontainerJsonPath);

devcontainerJson = jsonc.parse(devcontainerJsonRaw.toString());

// support both codespaces and vscode devcontainers
machineSettingsPaths = [
  path.normalize(
    `${process.env.HOME}/.vscode-remote/data/Machine/settings.json`
  ),
  path.normalize(
    `${process.env.HOME}/.vscode-server/data/Machine/settings.json`
  ),
];

machineSettingsPaths.forEach((p) => {
  try {
    fs.writeFileSync(
      p,
      JSON.stringify(devcontainerJson.settings, undefined, 2)
    );
    console.log("Updated machine settings", p);
  } catch {
    console.warn("Could not write machine settings file", p);
  }
});
