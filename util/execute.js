const { spawn } = require('child_process');
const os = require('os')

function main(exe, args) {
  require('./check-dat')(() => {
    const parseIp = require('../util/parse-ip');
    const parseCdn = require('../util/parse-cdn');
    const command = spawn(exe, args);

    if (exe === 'dig' || exe === 'nslookup') {
      command.stdout.on('data', data => {
        process.stdout.write(parseIp(parseCdn(data.toString())));
      });
    } else {
      command.stdout.on('data', data => {
        process.stdout.write(parseIp(data.toString()));
      });
    }

    command.stderr.on('data', data => {
      process.stdout.write(data.toString());
    });

    command.on('exit', code => {
      process.exit(code);
    });

    command.on('error', err => {
      if (err.code === 'ENOENT') {

          console.error(`ENOENT: Nali CLI 找不到 ${exe}, 请先安装或检查 PATH!`);
        if (os.platform()=='win32') {
          console.info(`Win32: Windows系统不包含dig/tracepath等命令,请自行安装!`);

        }
      } else {
        console.error('嗷呜，出现错误惹! ' + err.message || err);
      }
    });
  })
}

module.exports = main;
