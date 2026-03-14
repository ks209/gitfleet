const { runWorkerPool } = require("../core/workerPool");
const { loadConfig } = require("../core/config");
const { exec } = require("child_process");
const path = require("path");

function runGit(repo, command) {
  return new Promise((resolve, reject) => {

    exec(`git -C "${repo}" ${command}`, (err, stdout, stderr) => {

      const name = path.basename(repo);

      if (err) {
        console.log(`❌ ${name}`);
        console.log(stderr || err.message);
        return reject(err);
      }

      console.log(`✔ ${name}`);

      if (stdout && stdout.trim()) {
        console.log(stdout.trim());
      }

      resolve(stdout);

    });

  });
}

async function pullRepos() {

  const config = loadConfig();
  const repos = config.repos || [];

  if (repos.length === 0) {
    console.log("No repositories configured.");
    return;
  }

  console.log(`Pulling ${repos.length} repositories...\n`);

  const results = await runWorkerPool(
    repos,
    repo => runGit(repo, "pull"),
    4
  );

  return results;
}

module.exports = pullRepos;