const readline = require("readline");
const { existsSync, createReadStream, mkdirSync: _mkdirSync } = require("fs");
const { writeFile } = require("fs/promises");
const { dirname } = require("path");
const { QUERY_SERVER_PERSIST_PATH } = require("./const");

function mkdirsSync(path) {
  if (!path) throw new TypeError("mkdirsSync path is required!");

  const parent = dirname(path);

  if (!existsSync(parent)) mkdirsSync(parent);
  if (!existsSync(path)) _mkdirSync(path);
}

async function getPersistServerName() {
  if (!existsSync(QUERY_SERVER_PERSIST_PATH)) return;

  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: createReadStream(QUERY_SERVER_PERSIST_PATH, "utf-8"),
      output: process.stdout,
      terminal: false,
    });

    // only get the first line
    rl.once("line", (line) => {
      rl.close();
      resolve(line);
    });
  });
}

async function setPersistServerName(newServerName) {
  mkdirsSync(dirname(QUERY_SERVER_PERSIST_PATH));
  await writeFile(QUERY_SERVER_PERSIST_PATH, newServerName, "utf-8");
}

exports.getPersistServerName = getPersistServerName;
exports.setPersistServerName = setPersistServerName;
