#!/usr/bin/env -S node --experimental-modules --trace-warnings

import commander from 'commander';
const { Command } = commander;
const program = new Command();

program
  .option('-f, --force', 'force report');

program.parse(process.argv);

async function main({}){

  console.log('Executing main...');


}

main({})
