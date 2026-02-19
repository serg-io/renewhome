## Task 1034

We'd like to automate testing the product requirements from Task 1026. We'd like a functional test that drives a web browser (`firefox-esr` is installed in the devcontainer) that loads our page and exercises our test database.

We don't have a specific framework in mind, so we'd like to see a demo of one of them for our weekly engineering meeting.

## Deliverables

- [ ] Recommend a framework for automating end-to-end testing. Include this in a markdown doc under frontend.
- [ ] Write a test that, at minimum, exercises one of the product requirements from Task 1026, is runnable locally, and passes.

(Given our dev environment includes users running from codespaces, headless tests are fine.)

## Stretch Goals

- Include an elevator-pitch level write-up of alternative frameworks and why you'd prefer the one you're recommending.
- Include a regression test that would fail due to the unmet requirement in 1026.
- Extend the tests to cover any requirements from 1026 that you think would make for a convincing demo.
- Get the test(s) running successfully in CI.
