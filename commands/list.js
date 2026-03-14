const { loadConfig } = require("../core/config");
const path = require("path")

module.exports = function(){
    const config = loadConfig();

    if (config.repos.length === 0) {
    console.log("No repositories added.");
    return;
    }

    config.repos.forEach((repo, i) => {
        const name = path.basename(repo);
        console.log(`${i + 1}. ${name} → ${repo}`);
    });
}