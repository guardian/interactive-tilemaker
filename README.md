# TODO
- [X] Follow https://github.com/guardian/cdk/blob/main/docs/setting-up-a-gucdk-project.md to create a new GuCDK project
```sh
npx @guardian/cdk@latest new \
  --app riff-raff \
  --stack deploy \
  --stage CODE \
  --stage PROD \
  --package-manager npm
```
- [x] Setup the project in CI (https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) and CD
- [ ] Run the Dockerfile in AWS (via GuCDK)
   - [ ] Run the HelloWorld image in AWS
   - [ ] Run our image in AWS
       - [ ] Make the repo public
       - [ ] Publish image to GitHub Packages during CI
- [ ] Profit?