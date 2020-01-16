const { spawn } = require('child_process');
const parseIp = require('../util/parse-ip');

function main(exe, args) {
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

module.exports = main;
