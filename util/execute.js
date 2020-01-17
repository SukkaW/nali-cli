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

    command.on('error', err => {
      if (err.code === 'ENOENT') {
        console.error(`ENOENT: Nali CLI 找不到 ${exe}, 请先安装或检查 PATH!`);
      } else {
        console.error('嗷呜，出现错误惹! ' + err.message || err);
      }
    });
  }
}

module.exports = main;
