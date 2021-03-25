require('stream.pipeline-shim/auto');
const { promisify } = require('util');
const { existsSync, createWriteStream, renameSync, mkdirSync: _mkdirSync } = require('fs');
const { dirname } = require('path');
const { pipeline: _pipeline } = require('stream');
const { get } = require('axios');
const { decode: gbkDecode } = require('gbk.js');
const pipeline = promisify(_pipeline);
const ProgressBar = require('progress');
const { yellow, green } = require('chalk');
const { version: cliVersion } = require('../package.json');
const QQWry = require('lib-qqwry');
const { spacing } = require('pangu');

function mkdirsSync(path) {
  if (!path) throw new TypeError('path is required!');

  const parent = dirname(path);

  if (!existsSync(parent)) mkdirsSync(parent);
  if (!existsSync(path)) _mkdirSync(path);
}

async function getURLFile(url, showProgressBar = false) {
  return get(url, {
    responseType: 'stream',
    headers: {
      'User-Agent': `Nali/${cliVersion} (Nali CLI, https://nali.skk.moe)`
    }
  }).then(({ headers, data }) => {
      if (showProgressBar) {
        const bar = new ProgressBar(
          '正在下载 [:bar] :percent  剩余时间 :etas',
          {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: +headers['content-length']
          }
        );
        data.on('data', ({ length }) => {
          bar.tick(length);
        });
      }
      return data;
    });
}

const get_copywrite = showBar => getURLFile('https://qqwry.mirror.noc.one/copywrite.rar', showBar);
const get_qqwry = showBar => getURLFile('https://qqwry.mirror.noc.one/QQWry.Dat', showBar);

async function getLastInfo() {
  const copywrite = await get_copywrite();
  let buf = Buffer.alloc(0)
  for await (const data of copywrite) {
    buf = Buffer.concat([buf, data])
  }
  return gbkDecode(buf.slice(24, 64))
    .replace(/\0/g, '');
}

async function qqwryUpdate(dataPath) {
  const tempPath = `${dataPath}.tmp`;
  mkdirsSync(dirname(tempPath));
  return pipeline(
    await get_qqwry(true),
    createWriteStream(tempPath)
  ).then(() => {
    renameSync(tempPath, dataPath);
  });
}

async function downloadQqwry(dataPath) {
  console.log(yellow('没有找到 IP 数据库！开始下载...'));
  qqwryUpdate(dataPath).then(() => {
    const { Area: dataVersion } = new QQWry(true, dataPath).searchIP('255.255.255.255');
    console.log(green('下载完成!') + ' IP 库版本: ' + spacing(dataVersion.replace('IP数据', '').trim()));
  });
}

exports.getLastInfo = getLastInfo;
exports.qqwryUpdate = qqwryUpdate;
exports.downloadQqwry = downloadQqwry;
