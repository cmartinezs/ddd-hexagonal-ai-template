#!/usr/bin/env node
import { runCommand } from '../src/commands/router.js';

const rawArgs = process.argv.slice(2);
const command = rawArgs[0];
const commandArgs = rawArgs.slice(1);
const opts: Record<string, unknown> = {};

if (command === '--help' || command === '-h' || command === 'help') {
  opts['help'] = true;
}
if (command === '--version' || command === '-v' || command === 'version') {
  opts['version'] = true;
}

runCommand(command, commandArgs, opts).catch((err: Error) => {
  console.error('\n  Error: ' + err.message);
  process.exit(1);
});