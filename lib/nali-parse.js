#!/usr/bin/env node

const commander = require('commander');
const { parseIp } = require('../util/parse-ip');
const stdin = require('stdin');

function main() {
  stdin(str => {
    const output = parseIp(str);

    console.log(output);
  });
}

commander
  .name('parse')
  .usage('[string]')
  .description('解析 stdin 或参数中的 IP')
  .parse(process.argv);

const rawArgs = process.argv.slice(2).join(' ');

if (rawArgs) {
  console.log(parseIp(rawArgs));
} else {
  main();
}
