#!/usr/bin/env node

const execute = require('../util/execute');

execute('nslookup', process.argv.slice(2));
