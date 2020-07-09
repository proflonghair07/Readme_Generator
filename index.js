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
      message: "Give a brief description of your application?",
    },
    {
      type: "input",
      name: "installation",
      message: "Briefly layout the steps required to install your application?",
    },
    {
      type: "input",
      name: "usage",
      message: "Describe your application's inteded use.",
    },
    {
      type: "list",
      message: "Choose a license for the project:",
      name: "license",
      choices: [
        "GNU AGPLv3",
        "GNU GPLv3",
        "GNU LGPLv3",
        "Mozilla Public 2.0",
        "Apache 2.0",
        "MIT",
        "Boost Software 1.0",
        "The Unlicense",
        "None",
      ],
    },
    {
      type: "input",
      name: "contributing",
      message: "Explain how users can contribute to your application",
    },
  ]);
}

function generateREADME(answers) {
  return `
# ${answers.title}

## Table of Contents
* [Description Of Application](#description-of-application)
* [Usage Information](#usage-information)
* [Installation Process](#installation-process)
* [Application License](#application-license)
* [How to contribute](#how-to-contribute)

## Description Of Application
### ${answers.description}

## Usage Information
### ${answers.usage}

##  Installation Process
### ${answers.installation}

## Application License
### ${answers.license}

## How to contribute
### ${answers.contributing}`;
}

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
