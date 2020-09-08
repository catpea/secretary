#!/usr/bin/env -S node --experimental-modules --trace-warnings

import {inspect} from 'util';

import path from 'path';
import commander from 'commander';
import kebab from 'lodash/kebabCase.js';
process.cwd()

const { Command } = commander;
const program = new Command();
program.version('0.0.1');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
