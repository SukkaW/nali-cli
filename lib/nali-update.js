#!/usr/bin/env node

const commander = require('commander');
const { spacing } = require('pangu');
const { yellow, green, red } = require('chalk');
const { join } = require('path');
const QQWry = require('lib-qqwry');
const dataPath = join(__dirname, '../data/qqwry.dat');
const { searchIP } = new QQWry(true, dataPath);
const qqwryUpdate = require('./qqwryUpdate');
const readline = require('readline');

const { Area: dataVersion } = searchIP('255.255.255.255');

function isLatest(lastVersion) {
  lastVersion = lastVersion.substr(lastVersion.indexOf(' ') + 1);
  return !!~dataVersion.indexOf(lastVersion);
}

async function main() {
  const { last, force, yes } = commander.opts();
  const version = await qqwryUpdate.getLastInfo();
  if (last) {
    return console.log(spacing(version));
  }
  console.log(`本地 IP 库版本：${spacing(dataVersion.replace('IP数据', '').trim())}\n最新 IP 库版本: ${spacing(version.replace('纯真IP地址数据库', '').trim())}\n`);
  if (!force && isLatest(version)) {
    return console.log(yellow('当前 IP 库已是最新版本, 无需更新! '));
  }
  const p = (() => {
    if (yes || force) return Promise.resolve();
    return new Promise((reslove, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(yellow('当前 IP 库较旧, 是否更新? (y/n) '), answer => {
        rl.close();
        if (answer.match(/^y(es)?$/i)) {
          reslove();
        } else {
          reject();
        }
      });
    });
  })();
  return p.then(
    () => qqwryUpdate.qqwryUpdate(dataPath).then(() => {
      console.log(green('更新完成!'));
      // lc.close();
    }),
    () => {
      console.log(red('更新已取消!'))
    }
  );
}

commander
  .name('update')
  // .usage('[dataPath] [options]')
  .usage('[options]')
  .description('更新IP库(qqwry.dat)')
  .option('-l, --last', '获取最新IP库信息')
  .option('-f, --force', '强制更新IP库')
  .option('-y, --yes', '直接更新IP库')
  .parse(process.argv);

main().catch(err => {
  // console.error(err);
  console.error(err.message || err);
});