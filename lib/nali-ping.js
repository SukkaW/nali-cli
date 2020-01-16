#!/usr/bin/env node

const execute = require('../util/execute');

execute('ping', process.argv.slice(2));
