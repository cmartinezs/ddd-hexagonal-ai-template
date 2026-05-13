#!/usr/bin/env node
import { runCommand } from '../src/commands/router.js';

const rawArgs = process.argv.slice(2);

let opts: Record<string, unknown> = {};
let command: string | undefined;
let argsOffset = 0;

if (rawArgs[0] === '--help' || rawArgs[0] === '-h') {
  opts['help'] = true;
  command = rawArgs[1];
  argsOffset = 1;
} else if (rawArgs[0] === '--version' || rawArgs[0] === '-v') {
  opts['version'] = true;
  command = rawArgs[1];
  argsOffset = 1;
} else {
  command = rawArgs[0];
  argsOffset = 0;
}

let i = argsOffset;
while (i < rawArgs.length) {
  const arg = rawArgs[i]!;
  if (arg === '--copy' || arg === '--dry-run' || arg === '--confirm') {
    opts[arg.slice(2)] = true;
    i++;
    } else if (
      (arg === '--phase' || arg === '--context' || arg === '--attach' || arg === '--output' ||
        arg === '--agent' || arg === '--name' || arg === '--target' || arg === '--url' ||
        arg === '--format' || arg === '--file' || arg === '--from' || arg === '--to' ||
        arg === '--agent-name' || arg === '--id') &&
      rawArgs[i + 1] !== undefined
    ) {
      opts[arg.slice(2)] = rawArgs[i + 1];
      i += 2;
    } else if (arg === '--no-strict') {
      opts['no-strict'] = true;
      i++;
    } else if (arg === '--omit' && rawArgs[i + 1] !== undefined) {
      opts['omit'] = rawArgs[i + 1];
      i += 2;
    } else {
    i++;
  }
}

const rest = rawArgs.slice(argsOffset).filter((a) => !a.startsWith('--') && !a.startsWith('-'));

runCommand(command, rest, opts).catch((err: Error) => {
  console.error('\n  Error: ' + err.message);
  process.exit(1);
});
