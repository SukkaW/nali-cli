#!/usr/bin/env node

const commander = require('commander');
const { spacing } = require('pangu');
const { join } = require('path');
const QQWry = require('lib-qqwry');
const { searchIP } = new QQWry(true, join(__dirname, '../data/qqwry.dat'));

commander
  .usage('<command> [options]')
  .option('-v, --version', '版本信息')
  .command('parse', '解析 stdin 中的 IP 信息', { isDefault: true })
  .command('update', '更新 IP 库')

commander.on('option:version', () => {
  try {
    const { version: cliVersion } = require('../package.json');
    const { Area: qqwryVersion } = searchIP('255.255.255.255');

    console.log(`nali-cli v${cliVersion}`);
    console.log(`IP 数据库(qqwry.dat)：${spacing(qqwryVersion)}`);

    process.exit(0);
  } catch {
    console.error('嗷呜，出现错误惹：' + err.message || err);

    process.exit(1);
  }
});

commander.parse(process.argv);
