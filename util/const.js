const { join } = require('path');
const { homedir } = require('os');

module.exports.qqwryDataPath = join(homedir(), '.config/nali-cli/qqwry.dat');
