#!/usr/bin/env node

const commander = require('commander');
const parseIp = require('../util/parse-ip');
const parseCdn = require('../util/parse-cdn');

function main() {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    process.stdout.write(parseIp(parseCdn(data.toString())));
  });
}

commander
  .name('parse')
  .usage('[string]')
  .description('解析 stdin 或参数中的 IP')
  .parse(process.argv);

const rawArgs = process.argv.slice(2).join(' ');

if (rawArgs.length) {
  console.log(parseIp(parseCdn(rawArgs)));
} else {
  main();
}
