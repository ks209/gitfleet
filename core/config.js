const fs = require("fs");
const os = require("os");
const path = require("path");

const configDir = path.join(os.homedir(), ".gitfleet");
const configFile = path.join(configDir, "config.json");

function loadConfig() {
  if (!fs.existsSync(configFile)) {
    return { repos: [] };
  }

  return JSON.parse(fs.readFileSync(configFile));
}

function saveConfig(config) {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }

  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

module.exports = {
  loadConfig,
  saveConfig,
  configFile,
};