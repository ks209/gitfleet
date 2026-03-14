const fs = require("fs");
const path = require("path");

const scan = require("./scan");

function init(args = []) {

  const dir = path.join(process.cwd(), ".gitfleet");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const configPath = path.join(dir, "config.json");

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      JSON.stringify({ repos: [] }, null, 2)
    );
  }

  console.log("✔ GitFleet workspace initialized");

  if (args.includes("--scan")) {
    console.log("\n🔎 Scanning for git repositories...\n");
    scan(process.cwd());
  }
}

module.exports = init;