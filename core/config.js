const fs = require("fs");
const path = require("path");
const os = require("os");

function findWorkspaceConfig(start = process.cwd()) {
  let dir = start;

  while (dir !== path.dirname(dir)) {
    const configDir = path.join(dir, ".gitfleet");

    if (fs.existsSync(configDir)) {
      return path.join(configDir, "config.json");
    }

    dir = path.dirname(dir);
  }

  return null;
}

function globalConfigPath() {
  return path.join(os.homedir(), ".gitfleet", "config.json");
}

function loadConfig() {
  const workspace = findWorkspaceConfig();

  if (workspace && fs.existsSync(workspace)) {
    return JSON.parse(fs.readFileSync(workspace));
  }

  const global = globalConfigPath();

  if (fs.existsSync(global)) {
    return JSON.parse(fs.readFileSync(global));
  }

  return { repos: [] };
}

module.exports = {
  loadConfig,
  findWorkspaceConfig,
  globalConfigPath
};