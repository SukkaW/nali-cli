const { gray } = require("chalk");
const { spacing } = require("pangu");
const replaceAsync = require("string-replace-async");
const { get } = require("axios");

const ipv4Regex =
  /(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}/gm;

async function getIpInfo(ip) {
  return new Promise((resolve, reject) => {
    get(`http://tbip.alicdn.com/api/getipinfo?ip=${ip}`).then(({ data }) => {
      const { country, region, city, isp } = data.data;
      const ipInfo = [country, region, city, isp]
        .filter((v) => v !== "XX")
        .join(" ")
        .trim();
      resolve(ipInfo);
    });
  });
}

async function parseIpAsync(str) {
  return await replaceAsync(str, ipv4Regex, async (match) => {
    const ipInfo = await getIpInfo(match);
    return match + " " + gray(`[${spacing(ipInfo)}]`);
  });
}

module.exports = parseIpAsync;
