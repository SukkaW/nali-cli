const QUERY_SERVER_SCHEMA = {
  taobao: {
    getUrl: (ip) => `http://tbip.alicdn.com/api/getipinfo?ip=${ip}`,
    country: ["data", "country"],
    region: ["data", "region"],
    city: ["data", "city"],
    isp: ["data", "isp"],
  },
  "ip.sb": {
    getUrl: (ip) => `https://api.ip.sb/geoip/${ip}`,
    country: "country",
    region: "region",
    city: "city",
    isp: "isp",
  },
  "ipinfo.io": {
    getUrl: (ip) => `https://ipinfo.io/${ip}/json`,
    country: "country",
    region: "region",
    city: "city",
    isp: "org",
  },
  "ip-api": {
    getUrl: (ip) =>
      `https://pro.ip-api.com/json/${ip}?fields=16985625&key=EEKS6bLi6D91G1p`,
    country: "country",
    region: "regionName",
    city: "city",
    isp: "isp",
  },
  ipstack: {
    getUrl: (ip) =>
      `https://api.ipstack.com/${ip}?access_key=e53fd9c4e2f6f73161821bb7b0df0069`,
    country: "country_name",
    region: "region_name",
    city: "city",
    isp: ["connection", "isp"],
  },
  ipdata: {
    getUrl: (ip) =>
      `https://api.ipdata.co/${ip}?api-key=513d4b07583037a5a89b6cff4ebff0083bef180977dc71dd73804cf8`,
    country: "country_name",
    region: "region",
    city: "city",
    isp: ["asn", "name"],
  },
  ipwho: {
    getUrl: (ip) => `https://ipwho.is/${ip}`,
    country: "country",
    region: "region",
    city: "city",
    isp: ["connection", "isp"],
  },
  ipregistry: {
    getUrl: (ip) => `https://api.ipregistry.co/${ip}?key=pm3hsjigbozt9shn`,
    country: ["location", "country", "name"],
    region: ["location", "region", "name"],
    city: ["location", "city"],
    isp: ["connection", "organization"],
  },
};

exports.QUERY_SERVER_SCHEMA = QUERY_SERVER_SCHEMA;
