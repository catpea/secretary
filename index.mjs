#!/usr/bin/env -S node --experimental-modules --trace-warnings

import commander from 'commander';
const { Command } = commander;
const program = new Command();

program
  .version('1.0.1')
  .name("secretary")
  .description('Git based content management system for authors.')
  .usage("[global options] sub-command [command options]")

  .command('install [name]', 'install one or more packages').alias('i')
  .command('reformat', 'reformat repository to a higher version', { executableFile: 'src/reformat.mjs' }).alias('r')
  .command('report', 'repository content report', { isDefault: true, executableFile: 'src/report.mjs' });


  program.parse(process.argv);
