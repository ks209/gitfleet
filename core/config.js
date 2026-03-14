const fs = require("fs");
const path = require("path");

function getConfigPath() {
  return path.join(process.cwd(), ".gitfleet", "config.json");
}

function loadConfig() {
  const configPath = getConfigPath();

  if (!fs.existsSync(configPath)) {
    return { repos: [] };
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

function saveConfig(config) {
  const configPath = getConfigPath();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  loadConfig,
  saveConfig
};