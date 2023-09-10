const { join } = require("path");
const { homedir } = require("os");

const DEFAULT_QUERY_SERVER = "taobao";
const QUERY_SERVER_PERSIST_PATH = join(
  homedir(),
  ".config/nali-cli/servername.txt"
);
const FETCH_TIMEOUT = 3000;

module.exports = {
  DEFAULT_QUERY_SERVER,
  QUERY_SERVER_PERSIST_PATH,
  FETCH_TIMEOUT,
};
