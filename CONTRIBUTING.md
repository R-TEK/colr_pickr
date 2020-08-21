# Contribution Details

For information on features, optimizations and bugs states, check out the Colr Pickr project Trello page:

https://trello.com/b/ovPg9LEu

---

### Get the project:

Clone/Download the latest version of the repository from the master branch.

### Install dependencies:

```shell
$ npm install
```

### Create Branch:

Create a feature branch for the feature/issue you are working on, then switch to that branch. Note: All commits and pushes will be made to this branch.

Name your branch based on the feature/issue you are working on.

### Create a DEV Build

```shell
$ npm gulp devBuild
```

### Watch changes for gulp dev building:

```shell
$ gulp watch
```

### Make a Test Case for the Feature or Bug:

Make a test case for the bug or feature you are introducing into the project. To add a test case follow these steps:

-   Go to the google sheets page https://docs.google.com/spreadsheets/d/1CI887TolHwWMO1AjMvw_HjqIk_CLL1DHMBXizVzD8_w/edit?usp=sharing
-   Go under the section (sections highlighted in dark green) that you issue comes under
-   Insert a new row and follow the column title to create the test case (i.e. Test Case name under test case column etc)
-   Copy the drop down at the top of the page and insert it into the 'PASS/FAIL' column for the test case

### Open sample.html file

Located in ./src/sample.html

### Build Project:

```shell
$ npm run build
```

### Update JSDoc:

If you have made changes involving JsDoc then run this to update documentation.

```shell
$ npm run doc
```

### Test the Project:

Use the test case document to test the project as a whole, follow this link to the google sheets test case document https://docs.google.com/spreadsheets/d/1CI887TolHwWMO1AjMvw_HjqIk_CLL1DHMBXizVzD8_w/edit?usp=sharing

Test under the following:

-   Desktop Chrome
-   Desktop Firefox
-   Desktop Edge
-   Mobile Chrome
-   Mobile Firefox
-   Mobile Edge

### Push All

Push all changes under the branch you created for this feature/issue
