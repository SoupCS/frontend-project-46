#!/usr/bin/env node
import { program } from 'commander'
import genDiff from '../index.js'

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'read more information')
  .version('0.0.1', '-v, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.format)),
  )

program.parse(process.argv)
