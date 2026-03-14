const fs = require("fs");
const path = require("path");

const { loadConfig, saveConfig } = require("../core/config");

function findRepos(dir, repos = []) {

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {

    const fullPath = path.join(dir, item.name);

    if (item.name === ".git") {
      repos.push(dir);
      continue;
    }

    if (
      item.isDirectory() &&
      !["node_modules", ".git", ".gitfleet"].includes(item.name)
    ) {
      findRepos(fullPath, repos);
    }
  }

  return repos;
}

module.exports = function (scanPath) {

  scanPath = path.resolve(scanPath);

  if (!fs.existsSync(scanPath)) {
    console.log("❌ Path does not exist:", scanPath);
    return;
  }

  const repos = findRepos(scanPath);

  if (repos.length === 0) {
    console.log("No git repositories found.");
    return;
  }

  const config = loadConfig();

  let added = 0;

  for (const repo of repos) {

    if (!config.repos.includes(repo)) {
      config.repos.push(repo);
      added++;
      console.log("✅ Added:", repo);
    }

  }

  saveConfig(config);

  console.log("\nFound:", repos.length);
  console.log("Added:", added);
};