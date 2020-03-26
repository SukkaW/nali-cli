#!/usr/bin/env node

const commander = require('commander');
const { spacing } = require('pangu');
const { yellow, green, red } = require('chalk');
const { existsSync } = require('fs');
const QQWry = require('lib-qqwry');
const { qqwryDataPath } = require('../util/const');
const { qqwryUpdate, downloadQqwry, getLastInfo } = require('../util/qqwryUpdate');
const readline = require('readline');
let dataVersion;

function isLatest(lastVersion) {
  lastVersion = lastVersion.substr(lastVersion.indexOf(' ') + 1);
  return !!~dataVersion.indexOf(lastVersion);
}

async function main() {
  if (!existsSync(qqwryDataPath)) {
    downloadQqwry(qqwryDataPath);
  } else {
    dataVersion = new QQWry(true, qqwryDataPath).searchIP('255.255.255.255').Area;

    const { remote, force, yes } = commander.opts();
    const version = await getLastInfo();
    if (remote) return console.log(spacing(version));

    console.log(`本地 IP 库版本：${spacing(dataVersion.replace('IP数据', '').trim())}\n最新 IP 库版本: ${spacing(version.replace('纯真IP地址数据库', '').trim())}\n`);
    if (!force && isLatest(version)) return console.log(yellow('当前 IP 库已是最新版本, 无需更新!'));

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
      () => qqwryUpdate(qqwryDataPath).then(() => {
        console.log(green('更新完成!'));
      }),
      () => {
        console.log(red('更新已取消!'))
      }
    );
  }
}

commander
  .name('update')
  .usage('[options]')
  .description('更新 IP 库 (qqwry.dat)')
  .option('-r, --remote', '获取最新 IP 库版本信息')
  .option('-f, --force', '强制更新 IP 库')
  .option('-y, --yes', '直接更新 IP 库')
  .parse(process.argv);

main().catch(err => {
  console.error('嗷呜，出现错误惹! ' + err.message || err);
});
