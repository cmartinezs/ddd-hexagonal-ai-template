#!/usr/bin/env node
import { createProgram } from '../src/cli/program.js';

createProgram().parse(process.argv);
