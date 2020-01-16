#!/usr/bin/env node

const commander = require('commander');
const parseIp = require('../util/parse-ip');

function main() {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    process.stdout.write(parseIp(data.toString()));
  });
}

commander
  .name('parse')
  .usage('[string]')
  .description('解析 stdin 或参数中的 IP')
  .parse(process.argv);

const rawArgs = process.argv.slice(2).join(' ');

if (rawArgs.length) {
  console.log(parseIp(rawArgs));
} else {
  main();
}
