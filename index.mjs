#!/usr/bin/env -S node --experimental-modules --trace-warnings

import {inspect} from 'util';

import fs from 'fs-extra';
import path from 'path';

import cheerio from 'cheerio';
import moment from 'moment';
import pretty from 'pretty';

import commander from 'commander';
import kebab from 'lodash/kebabCase.js';


const options = {
  directory: {description:'Source directory containing the data', value:'src/text'}, // used to get a list of md files
  extension: {description:'Extension of files containing the original data', value:'.html'}, // files to scan
  output: {description:'Name of the output destination directory', value:'./dist'}, // to save the feed to
  name: {description:'Name of the feed file directory', value:'content'},
  file: {description:'Name of the feed file', value:'feed.json'},
}

const { Command } = commander;
const program = new Command();
program.version('0.0.1');

program
  .option('-v, --verbosity', 'increase output verbosity');

for (let [name, option] in options){
  console.log(`-${name.substr(0,1)}, --${name} <${name}>`, `${option.description}.`);

}

program.parse(process.argv);

if (program.debug) console.log(program.opts());

console.log('pizza details:');
if (program.analyze){
  console.log(`Directory analysis: ${program.analyze}`);
}
