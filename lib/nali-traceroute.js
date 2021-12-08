#!/usr/bin/env node
const os = require('os')
const execute = require('../util/execute');
if (os.platform() === 'win32') {
    //运行tracert -d
    execute('tracert', ['-d', process.argv.slice(2)]);
} else {
    execute('traceroute', process.argv.slice(2));

}
