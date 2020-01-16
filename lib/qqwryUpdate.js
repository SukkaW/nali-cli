require('stream.pipeline-shim/auto');
const { promisify } = require('util');
const { createWriteStream, renameSync } = require('fs');
const { pipeline: _pipeline } = require('stream');
const { get } = require('axios');
const { decode: gbkDecode } = require('gbk.js');
const pipeline = promisify(_pipeline);
const ProgressBar = require('progress');
const { version: cliVersion } = require('../package.json');

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
  copywrite.read(24);
  const version = gbkDecode(copywrite.read(128)).replace(/\0/g, '');
  return version;
}

async function qqwryUpdate(dataPath) {
  const tempPath = `${dataPath}.tmp`;
  return pipeline(
    await get_qqwry(true),
    createWriteStream(tempPath)
  ).then(() => {
    renameSync(tempPath, dataPath);
  });
}

exports.getLastInfo = getLastInfo;
exports.qqwryUpdate = qqwryUpdate;
