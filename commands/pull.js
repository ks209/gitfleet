const { loadConfig } = require("../core/config");
const { execSync } = require("child_process");

function isRepoDirty(repo) {

  const status = execSync("git status --porcelain", { cwd: repo })
    .toString()
    .trim();

  return status.length > 0;

}

module.exports = function () {
  const config = loadConfig();
  for (const repo of config.repos) {
    try {
      if (isRepoDirty(repo)) {
        console.log(`⚠ Skipping ${repo} (local changes)`);
        continue;
      }
      console.log(`⬇ Pulling ${repo}`);
      execSync("git pull", { cwd: repo, stdio: "inherit" });
    } catch (err) {
      console.log(`Failed for ${repo}`);
    }
  }

};