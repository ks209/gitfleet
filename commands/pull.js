const { runWorkerPool } = require("../core/workerPool");
const { exec } = require("child_process");

function runGit(repo, command) {
  return new Promise((resolve, reject) => {
    exec(`git -C "${repo}" ${command}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ ${repo}`);
        return reject(err);
      }

      console.log(`✔ ${repo}`);
      resolve(stdout);
    });
  });
}

async function pullRepos(repos) {
  await runWorkerPool(
    repos,
    (repo) => runGit(repo, "pull"),
    4
  );
}

module.exports = pullRepos;