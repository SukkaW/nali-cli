const { gray } = require("chalk");
const pangu = require("pangu");
const replaceAsync = require("string-replace-async");
const { get } = require("axios");
const { QUERY_SERVER_SCHEMA } = require("./server-schema");
const { DEFAULT_QUERY_SERVER, FETCH_TIMEOUT } = require("./const");
const { getPersistServerName } = require("./persist");

const ipv4Regex =
  /(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}/gm;

const cacheMap = new Map();
let targetServerName = DEFAULT_QUERY_SERVER;

const getValueByKey = (key, dataObj, schema) => {
  const keyOfSchema = schema[key];
  if (Array.isArray(keyOfSchema)) {
    const value = schema[key].reduce((tempResult, currentKey) => {
      if (!tempResult.hasOwnProperty(currentKey)) {
        return "?";
      }
      return tempResult[currentKey];
    }, dataObj);

    if (typeof value === typeof {}) return "?";

    return value;
  }

  // If the result has "?", it means that the server data does not match the current schema,
  // The schema need to be updated, or the special ip info was not returned as expected.
  if (
    !dataObj.hasOwnProperty(keyOfSchema) ||
    typeof dataObj[keyOfSchema] === typeof {}
  ) {
    return "?";
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
  const cacheData = cacheMap.get(ip);
  if (cacheData) return cacheData;

  const getIpInfoPromise = new Promise((resolve) => {
    const serverSchema = QUERY_SERVER_SCHEMA[targetServerName];
    get(serverSchema.getUrl(ip), { timeout: FETCH_TIMEOUT })
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
        // delete the cache when fetch error
        cacheMap.delete(ip);
        resolve();
      });
  });

  cacheMap.set(ip, getIpInfoPromise);
  return getIpInfoPromise;
}

async function parseIpAsync(str) {
  const persistServerName = await getPersistServerName();
  targetServerName = persistServerName || targetServerName;

  return await replaceAsync(str, ipv4Regex, async (match) => {
    const ipInfo = await getIpInfo(match);
    if (ipInfo) {
      return match + " " + gray(`[${pangu.spacing(ipInfo)}]`);
    }

    return match;
  });
}

module.exports = parseIpAsync;
