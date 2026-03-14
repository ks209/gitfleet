const fs = require("fs");
const path = require("path");

const { loadConfig, saveConfig } = require("../core/config");

module.exports = function (repoPath) {

  const absolutePath = path.resolve(repoPath);
  const gitDir = path.join(absolutePath, ".git");

  if (!fs.existsSync(absolutePath)) {
    console.log("❌ Path does not exist:", absolutePath);
    return;
  }

  if (!fs.existsSync(gitDir)) {
    console.log("❌ Not a git repository:", absolutePath);
    return;
  }

  const config = loadConfig();

  if (config.repos.includes(absolutePath)) {
    console.log("⚠ Repo already added:", absolutePath);
    return;
  }

  config.repos.push(absolutePath);

  saveConfig(config);

  console.log("✅ Added repo:", absolutePath);
};