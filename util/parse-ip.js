const { gray } = require("chalk");
const pangu = require("pangu");
const replaceAsync = require("string-replace-async");
const { get } = require("axios");
const { QUERY_IP_SERVER_MAP } = require("./const");

const QUERY_SERVER_NAME = "taobao";

const ipv4Regex =
  /(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}/gm;

const getValueByKey = (key, dataObj, schema) => {
  const keyOfSchema = schema[key];
  if (Array.isArray(keyOfSchema)) {
    return schema[key].reduce((tempResult, currentKey) => {
      if (!tempResult.hasOwnProperty(currentKey)) {
        return undefined;
      }
      return tempResult[currentKey];
    }, dataObj);
  }

  if (!dataObj.hasOwnProperty(keyOfSchema)) {
    return undefined;
  }

  return dataObj[keyOfSchema];
};

const getFormattedIpInfo = (res, serverSchema) => {
  return {
    country: getValueByKey("country", res, serverSchema),
    region: getValueByKey("region", res, serverSchema),
    city: getValueByKey("city", res, serverSchema),
    isp: getValueByKey("isp", res, serverSchema),
  };
};

async function getIpInfo(ip) {
  return new Promise((resolve) => {
    const serverSchema = QUERY_IP_SERVER_MAP[QUERY_SERVER_NAME];
    get(serverSchema.getUrl(ip), { timeout: 3000 })
      .then(({ data }) => {
        const { country, region, city, isp } = getFormattedIpInfo(
          data,
          serverSchema
        );
        const ipInfo = [...new Set([country, region, city, isp])]
          .filter((v) => !!v && v !== "XX")
          .join(", ")
          .trim();
        resolve(ipInfo);
      })
      .catch(() => {
        resolve();
      });
  });
}

async function parseIpAsync(str) {
  return await replaceAsync(str, ipv4Regex, async (match) => {
    const ipInfo = await getIpInfo(match);
    if (ipInfo) {
      return match + " " + gray(`[${pangu.spacing(ipInfo)}]`);
    }

    return match;
  });
}

module.exports = parseIpAsync;
