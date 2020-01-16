const { spawn } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');
const dataPath = join(process.env.HOME, '.config/nali-cli/qqwry.dat');

function main(exe, args) {
  if (!existsSync(dataPath)) {
    const { downloadQqwry } = require('../util/qqwryUpdate');
    downloadQqwry(dataPath);
  } else {
    const parseIp = require('../util/parse-ip');
    const command = spawn(exe, args);

    command.stdout.on('data', data => {
      process.stdout.write(parseIp(data.toString()));
    });

    command.stderr.on('data', data => {
      process.stdout.write(data.toString());
    });

    command.on('exit', code => {
      process.exit(code);
    });
  }
}

module.exports = main;
