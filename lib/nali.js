#!/usr/bin/env node

const commander = require("commander");

commander
  .usage("<command> [options]")
  .option("-v, --version", "版本信息")
  .command("parse", "解析 stdin 或参数中的 IP 信息 (默认)", {
    isDefault: true,
  })
  .command("server", "更改 IP 查询服务器");

const version = () => {
  try {
    const { version: cliVersion } = require("../package.json");
    console.log(`nali-cli (Nali CLI) v${cliVersion}`);
    process.exit(0);
  } catch {
    console.error("嗷呜，出现错误惹：" + err.message || err);

    process.exit(1);
  }
};

commander.on("option:version", version);
commander.on("command:version", version);

commander.parse(process.argv);
