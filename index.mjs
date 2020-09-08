#!/usr/bin/env -S node --experimental-modules --trace-warnings

import {inspect} from 'util';

import fs from 'fs-extra';
import path from 'path';

import cheerio from 'cheerio';
import moment from 'moment';
import pretty from 'pretty';

import commander from 'commander';
import kebab from 'lodash/kebabCase.js';

const { Command } = commander;
const program = new Command();

const registry = {
  directory: {description:'source directory containing the data', value:'src/text'},
  extension: {description:'extension of files containing the original data', value:'.html'},
  output: {description:'name of the output/destination directory', value:'./dist/content'},
  file: {description:'name of the feed file', value:'feed.json'},
}

program.version('0.0.1');

// commander setup
program.option('-v, --verbosity', 'increase output verbosity');

// NOTE: automatically add registry options as commander command line arguments
for (let [name, option] of Object.entries(registry)){
  program.option(`-${name.substr(0,1)}, --${name} <${name}>`, `set ${option.description} (${option.value}).`);
}

program
  .command('info', { isDefault: true })
  .option('-x, --extra-helpful', 'be extra helpful')
  .description('clone a repository into a newly created directory')
  .action(function ({extraHelpful}) {
      console.log('Printing info', extraHelpful);
  })


// process command line
program.parse(process.argv);

const options = {};

// NOTE: create options based on information from registry overriding based on data from command line
for (let [name, option] of Object.entries(registry)){
  let value = option.value;
  if(program[name]) value = program[name];
  options[name] = value;
}
