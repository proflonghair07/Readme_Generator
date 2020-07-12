const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your applications title?",
    },
    {
      type: "input",
      name: "description",
      message: "Give a brief description of your application.",
    },
    {
      type: "input",
      name: "installation",
      message: "Briefly layout the steps required to install your application.",
    },
    {
      type: "input",
      name: "usage",
      message: "Describe your application's inteded use.",
    },
    {
      type: "input",
      name: "test",
      message: "Give the user some test instructions.",
    },
    {
      type: "list",
      message: "Choose a license for your application from the list below.",
      name: "license",
      choices: [
        "Mozilla%Public%2.0",
        "Apache%2.0",
        "MIT",
        "Boost%Software%1.0",
        "The%Unlicense",
        "GNU%AGPLv3",
        "GNU%GPLv3",
        "GNU%LGPLv3",
      ],
    },
    {
      type: "list",
      message: "Choose a the link to the license you chose.",
      name: "licenseLink",
      choices: [
        "[Mozilla Public 2.0](https://www.mozilla.org/en-US/MPL/2.0/)",
        "[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)",
        "[MIT](https://choosealicense.com/licenses/mit/)",
        "[Boost Software 1.0](http://zone.ni.com/reference/en-XX/help/373194E-01/cdaq-foss/boost-license-v-1-0/)",
        "[The Unlicense](https://unlicense.org/)",
        "[GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html)",
        "[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)",
        "[GNU LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.html)",
      ],
    },
    {
      type: "input",
      name: "contributing",
      message: "Explain how users can contribute to your application",
    },
    {
      type: "input",
      name: "github",
      message: "Include a link to your personal github page.",
    },
    {
      type: "input",
      name: "email",
      message: "Include a link to your personal email.",
    },
  ]);
}

function generateREADME(answers) {
  return `
# ${answers.title}<br>
![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-lightgrey.svg)
## Table of Contents
* [Description Of Application](#description-of-application)
* [Usage Information](#usage-information)
* [Installation Process](#installation-process)
* [Test Instructions](#test-instructions)
* [Application License](#application-license)
* [How to contribute](#how-to-contribute)
* [Questions](#questions)

## Description Of Application
### ${answers.description}

## Usage Information
### ${answers.usage}

##  Installation Process
### ${answers.installation}

## Test Instructions
### ${answers.test}

## Application License
### This application uses the ${answers.licenseLink} license.

## How to contribute
### ${answers.contributing}

## Questions
### For more questions regarding the application feel free to reach out to me at <${answers.email}><br>  
### You can also check out my personal GitHub account here: <${answers.github}>

`;
}
// license badge attempts to be made
// function getBadgeLink() {
//   let badgeLink;
//   if (answers.license === "") {
//     badgeLink = "https://www.gnu.org/licenses/agpl-3.0.html";
//   }
//   console.log(badgeLink);
// }

//
promptUser()
  .then(function (answers) {
    const README = generateREADME(answers);

    return writeFileAsync("README.md", README);
  })
  .then(function () {
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) {
    console.log(err);
  });
