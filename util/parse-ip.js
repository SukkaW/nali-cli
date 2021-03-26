const { gray } = require('chalk');
const { spacing } = require('pangu');
const QQWry = require('lib-qqwry');
const { qqwryDataPath } = require('./const');
const { searchIP } = new QQWry(true, qqwryDataPath);

const ipv4Regex = /(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}(?=[\s$])/gm;

const parseIp = str => {
  return str.replace(ipv4Regex, match => {
      const { Country, Area } = searchIP(match);
      return match + ' ' + gray(`[${spacing((Country + ' ' + Area).replace(/CZ88.NET/g, '').trim())}]`);
  })
}

module.exports = parseIp;
