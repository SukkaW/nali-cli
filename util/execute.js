const { spawn } = require("child_process");

function main(exe, args) {
  const parseIp = require("../util/parse-ip");
  const parseCdn = require("../util/parse-cdn");
  const command = spawn(exe, args);

  if (exe === "dig" || exe === "nslookup") {
    command.stdout.on("data", async (data) => {
      process.stdout.write(await parseIp(parseCdn(data.toString())));
    });
  } else {
    command.stdout.on("data", async (data) => {
      process.stdout.write(await parseIp(data.toString()));
    });
  }

  command.stderr.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  // command.on('exit', code => {
  //   process.exit(code);
  // });

  command.on("error", (err) => {
    if (err.code === "ENOENT") {
      console.error(`ENOENT: Nali CLI 找不到 ${exe}, 请先安装或检查 PATH!`);
    } else {
      console.error("嗷呜，出现错误惹! " + err.message || err);
    }
  });
}

module.exports = main;
