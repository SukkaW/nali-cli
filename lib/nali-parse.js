#!/usr/bin/env node

const { spacing } = require('pangu');
const { join } = require('path');
const QQWry = require('lib-qqwry');
const { searchIP } = new QQWry(true, join(__dirname, '../data/qqwry.dat'));
const { gray } = require('chalk');
const stdin = require('stdin');
const { v4: isIpv4 } = require('is-ip');
const reSimpleIP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/gm

stdin(str => {
  if (!str) process.exit(0);

  const output = str.replace(reSimpleIP, match => {
    if (isIpv4(match)) {
      const { Country, Area } = searchIP(match);
      return match + ' ' + gray(`[${spacing((Country + ' ' + Area).replace(/CZ88.NET/g, '').trim())}]`);
    }

    return match;
  })

  console.log(output);
});
