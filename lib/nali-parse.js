#!/usr/bin/env node

const commander = require('commander');
const { spacing } = require('pangu');
const { join } = require('path');
const QQWry = require('lib-qqwry');
const { searchIP } = new QQWry(true, join(__dirname, '../data/qqwry.dat'));
const { gray } = require('chalk');
const stdin = require('stdin');
const { v4: isIpv4 } = require('is-ip');
const reSimpleIP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/gm

const parseIp = str => {
  return str.replace(reSimpleIP, match => {
    if (isIpv4(match)) {
      const { Country, Area } = searchIP(match);
      return match + ' ' + gray(`[${spacing((Country + ' ' + Area).replace(/CZ88.NET/g, '').trim())}]`);
    }

    return match;
  })
}

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
