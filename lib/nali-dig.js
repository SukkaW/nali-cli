#!/usr/bin/env node

const execute = require('../util/execute');

execute('dig', process.argv.slice(2));
