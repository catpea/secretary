#!/usr/bin/env -S node --experimental-modules --trace-warnings

import {inspect} from 'util';
import fs from 'fs-extra';
import path from 'path';
import cheerio from 'cheerio';
import moment from 'moment';
import pretty from 'pretty';
import commander from 'commander';
import kebab from 'lodash/kebabCase.js';
import report from './src/report.mjs'
import reformat from './src/reformat.mjs'
const { Command } = commander;
const program = new Command();

// NOTE: heads up be mindful of letters that these options start with they all need to be [u]nique! that's the unix command line.
const registry = {

  directory: {description:'source directory containing the data', value:'src/text'},
  extension: {description:'extension of files containing the original data', value:'.html'},
  output: {description:'name of the output/destination directory', value:'./dist/content'},
  file: {description:'name of the feed file', value:'feed.json'},

  commands: [
      {
        name: 'reformat',
        description: 'reformat information repository',
        function: reformat,
        transformation: {description:'name of the transformation', value:'transformed'},
        more: {description:'do some extra work'}
      }
  ]

}

program.version('0.0.1');

// commander setup
program.option('-v, --verbosity', 'increase output verbosity');

// NOTE: automatically add registry options as commander command line arguments
for (let [name, option] of Object.entries(registry)){
  if(name === 'commands') continue; // child command, skip this

  if(option.value){
    program.option(`-${name.substr(0,1)}, --${name} <${name}>`, `set ${option.description} (${option.value}).`);
  }else{
    program.option(`-${name.substr(0,1)}, --${name}`, `set ${option.description}.`);
  }

}

program
  //
  // .command('report', { isDefault: true })
  // .description('report information about the content repository')
  // .action(function (setup) {
  //   const options = configuration(setup)
  //   report(options);
  // })
  //
  // .command('reformat', { isDefault: true })
  // .description('reformat information repository')
  // .action(function (setup) {
  //   const options = configuration(setup)
  //   reformat(options);
  // })


// for(let [name, option] of Object.entries(registry.commands)){
//   console.log(name, option);
//   const command = program.command(name);
//   command.description(option.description)
//
//   for(let name in option){
//     if(typeof option[name] == 'object') command.option(`-${name.substr(0,1)}, --${name} <${name}>`, `set ${option[name].description} (${option[name].value}).`)
//   }
//
// }


for (let entry of registry.commands){

  const command = program.command(entry.name);
  command.description(entry.description)
  for(let name in entry){
    if(typeof entry[name] == 'object') {
      if(entry[name].value){
        command.option(`-${name.substr(0,1)}, --${name} <${name}>`, `set ${entry[name].description} (${entry[name].value}).`)
      }else{
        command.option(`-${name.substr(0,1)}, --${name}`, `set ${entry[name].description}.`)
      }
    }
  }
  command.action(function (setup) {
    const options = configuration(setup, entry)
    entry.function(options);
  })

}


// process command line
program.parse(process.argv);

function configuration(program, extras){
  const response = {};
  // NOTE: create options based on information from registry overriding based on data from command line

  for (let [name, option] of Object.entries(registry)){
    if(!Array.isArray(option)){
      let value = option.value;
      if(program[name]) value = program[name];
      response[name] = value;
    }
  }

  for (let [name, option] of Object.entries(extras)){
    if(typeof option == 'object'){
      let value = option.value;
      if(program[name]) value = program[name];
      response[name] = value;
    }
  }

  return response;
}
