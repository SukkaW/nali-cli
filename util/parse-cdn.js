const { gray } = require('chalk');
const cdnData = require('@sukka/cdn');
const rCdnCNAME = new RegExp(Object.keys(cdnData).join('(\\.)*$|'), 'gm');

const parseCdn = str => {
  return str.replace(rCdnCNAME, match => {
    if (match.includes('kunlun')) {
      // Aliyun CDN
      return match + ' ' + gray('[阿里云 CDN]');
    }

    let cname = match;
    if (!cdnData[match]) {
      cname = match.replace(/\.$/gm, '');
    }

    if (cdnData[cname]) {
      return match + ' ' + gray(`[${cdnData[cname].name}]`);
    }
    return match;
  })
};

module.exports = parseCdn;
