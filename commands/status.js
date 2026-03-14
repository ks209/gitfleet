const { loadConfig } = require("../core/config");
const { execSync } = require("child_process");

module.exports = function () {

  const config = loadConfig();

  for (const repo of config.repos) {

    try {

      const output = execSync("git status --porcelain", { cwd: repo })
        .toString()
        .trim();

      if (!output) {
        console.log(`Repo: ${repo} → clean`);
      } else {
        const lines = output.split("\n").length;
        console.log(`Repo: ${repo} → ${lines} changes`);
      }

    } catch {
      console.log(`Repo: ${repo} → error`);
    }

  }

};