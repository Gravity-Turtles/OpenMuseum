To contribute to the project, please follow these steps:




GRAVITY-TURTLES

Initial individual setup

[include any dependencies that need to be installed on a dev machine]
[include any configuration info that needs to be set on a dev machine]

[how do I start my local test environment for dev work?]
  npm run start
[how do I start a production environment]
  npm run production


Fork [org/repo] to your repo
git clone from your repo
git remote add upstream [org/repo]
git checkout dev
If the above doesn't work and you don't have a dev branch, do this:
git checkout dev origin/dev


  //////////////
 // Workflow //
//////////////
git pull --rebase upstream dev
git checkout -b [feature branch name]
Develop, build, test
git add ./or [filename(s)] && git commit -m "[commit message here]"
git push origin [feature branch name]
git checkout dev
git pull --rebase upstream dev
git merge [feature branch name]
Deal with merge conflicts, if any
git push origin dev
Submit a pull request to org/repo:dev via GitHub





/*
Sample CONTRIBUTING.md from John M

Get approval for the idea by filing an issue and talking with me about the changes.
Fork the repo
Make a branch for your change
Run npm install
Run npm start
Make your changes and add tests for your changes.
Test your changes (use npm test we have a githook that disallows anything less than 100% code coverage)
Run git add -A to add your changes (please don't add any changes to the dist directory).
Run npm run commit (Do not use git commit) - follow the prompts to create your git message
Push your changes with git push
Create the Pull Request
Get merged and celebrate!

*/