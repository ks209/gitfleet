const { execSync } = require("child_process");

function runGit(repo, command) {

  try {

    const output = execSync(command, { cwd: repo });

    return output.toString();

  } catch (err) {

    return "Error";

  }

}

module.exports = {
  runGit,
};