#!/usr/bin/env node

const commander = require("commander");
const parseIpAsync = require("../util/parse-ip");
const parseCdn = require("../util/parse-cdn");

async function main() {
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", async (data) => {
    process.stdout.write(await parseIpAsync(parseCdn(data.toString())));
  });
}

async function getIpInfoByNet(ip) {
  return await parseIpAsync(parseCdn(ip));
}

commander
  .name("parse")
  .usage("[string]")
  .description("解析 stdin 或参数中的 IP")
  .parse(process.argv);

const rawArgs = process.argv.slice(2).join(" ");

if (rawArgs.length) {
  getIpInfoByNet(rawArgs).then((v) => console.log(v));
} else {
  main().catch((err) => {
    console.error("嗷呜，出现错误惹! " + err.message || err);
  });
}
