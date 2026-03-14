const fs = require("fs");
const path = require("path");

const { loadConfig, saveConfig } = require("../core/config");

module.exports = function (repoPath) {

  const gitDir = path.join(repoPath, ".git");

  if (!fs.existsSync(repoPath)) {
    console.log("Path does not exist:", repoPath);
    return;
  }

  if (!fs.existsSync(gitDir)) {
    console.log("Not a git repository:", repoPath);
    return;
  }

  const config = loadConfig();

  if (config.repos.includes(repoPath)) {
    console.log("⚠ Repo already added:", repoPath);
    return;
  }

  config.repos.push(repoPath);

  saveConfig(config);

  console.log("✅ Added repo:", repoPath);
};