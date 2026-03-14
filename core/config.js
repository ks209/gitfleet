const fs = require("fs");
const path = require("path");
const os = require("os");

function findWorkspaceConfig() {

  let dir = process.cwd();

  while (dir !== path.parse(dir).root) {

    const configPath = path.join(dir, ".gitfleet", "config.json");

    if (fs.existsSync(configPath)) {
      return configPath;
    }

    dir = path.dirname(dir);
  }

  return null;
}

function getGlobalConfig() {

  const globalDir = path.join(os.homedir(), ".gitfleet");
  const globalConfig = path.join(globalDir, "config.json");

  if (!fs.existsSync(globalDir)) {
    fs.mkdirSync(globalDir, { recursive: true });
  }

  if (!fs.existsSync(globalConfig)) {
    fs.writeFileSync(globalConfig, JSON.stringify({ repos: [] }, null, 2));
  }

  return globalConfig;
}

function getConfigPath() {

  const workspace = findWorkspaceConfig();

  if (workspace) {
    return workspace;
  }

  return getGlobalConfig();
}

function loadConfig() {

  const configPath = getConfigPath();

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