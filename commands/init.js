const { saveConfig, configFile } = require("../core/config");

module.exports = function () {

  saveConfig({ repos: [] });

  console.log("GitFleet initialized");
  console.log("Config file:", configFile);

};