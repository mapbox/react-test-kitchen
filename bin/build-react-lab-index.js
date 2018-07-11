#!/usr/bin/env node
"use strict";

const meow = require("meow");
const buildIndex = require("../lib/build-index");
const fs = require("fs");

const description =
  "CLI for building an index of components in a specified directory";

const help = `
  Usage
    $ build-react-lab-index <input> <output>

  Arguments
    input             directory containing source components
    output            output file

  Examples
    $ build-react-lab-index ./src ./component-index.js
`;

const cli = meow({ description, help });

const input = cli.input[0];
const output = cli.input[1];

if (cli.input.length !== 2) {
  console.error(`Incorrect arguments`);
  cli.showHelp();
}

buildIndex(input, output)
  .then(result => {
    fs.writeFileSync(output, result);
  })
  .catch(error => {
    console.error(error);
  });
