const { gray } = require('chalk');
const { spacing } = require('pangu');
const { join } = require('path');
const QQWry = require('lib-qqwry');
const { homedir } = require('os');
const { searchIP } = new QQWry(true, join(homedir(), '.config/nali-cli/qqwry.dat'));
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

module.exports = parseIp;
