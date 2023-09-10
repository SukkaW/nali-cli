#!/usr/bin/env node

const commander = require("commander");
const { select } = require("@inquirer/prompts");
const { spacing } = require("pangu");
const { yellow, green, red } = require("chalk");
const { DEFAULT_QUERY_SERVER } = require("../util/const");
const {
  getPersistServerName,
  setPersistServerName,
} = require("../util/persist");
const { QUERY_SERVER_SCHEMA } = require("../util/server-schema");

async function main() {
  const { current, defaultServer } = commander.opts();
  const persistServerName = await getPersistServerName();
  let newServerName;

  console.log(
    spacing(
      `Current query server is [${yellow(
        persistServerName
          ? persistServerName
          : `${DEFAULT_QUERY_SERVER} (by default)`
      )}]
    `
    )
  );

  if (current) return;

  if (!defaultServer) {
    newServerName = await select({
      message: "Select a query server: ",
      choices: Object.keys(QUERY_SERVER_SCHEMA).map((v) => {
        return {
          value: v,
        };
      }),
      pageSize: 10,
    });
  } else {
    newServerName = DEFAULT_QUERY_SERVER;
  }

  await setPersistServerName(newServerName);
  console.log(green(`Change query server to [${newServerName}] success!`));
}

commander
  .name("server")
  .usage("[options]")
  .description("更改查询服务器")
  .option("-c, --current", "查看当前使用的查询服务器")
  .option("-d, --defaultServer", "使用默认的查询服务器")
  .parse(process.argv);

main().catch((err) => {
  console.error("嗷呜，出现错误惹! " + err.message || err);
});
