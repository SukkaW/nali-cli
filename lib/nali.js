#!/usr/bin/env node

const commander = require('commander');
const { spacing } = require('pangu');
const { join } = require('path');
const ipdbPath = join(process.env.HOME, '.config/nali-cli/qqwry.dat');
const { existsSync } = require('fs');
const QQWry = require('lib-qqwry');
let searchIP;

if (!existsSync(ipdbPath)) {
  const { downloadQqwry } = require('../util/qqwryUpdate');
  downloadQqwry(ipdbPath);
} else {
  commander
    .usage('<command> [options]')
    .option('-v, --version', '版本信息')
    .command('parse', '解析 stdin 或参数中的 IP 信息 (默认)', { isDefault: true })
    .command('update', '更新 IP 库')

  const version = () => {
    try {
      searchIP = new QQWry(false, ipdbPath).searchIP;
      const { version: cliVersion } = require('../package.json');
      const { Area: qqwryVersion } = searchIP('255.255.255.255');

      console.log(`nali-cli (Nali CLI) v${cliVersion}`);
      console.log(`IP 数据库 (qqwry.dat) 版本信息: ${spacing(qqwryVersion)}`);

      process.exit(0);
    } catch {
      console.error('嗷呜，出现错误惹：' + err.message || err);

      process.exit(1);
    }
  }

  commander.on('option:version', version);
  commander.on('command:version', version);

  commander.parse(process.argv);
}
