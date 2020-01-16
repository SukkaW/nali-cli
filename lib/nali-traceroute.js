#!/usr/bin/env node

const execute = require('../util/execute');

execute('traceroute', process.argv.slice(2));
