const { loadConfig } = require("../core/config");

const { execSync } = require("child_process");



module.exports = function () {

    const config = loadConfig();

    for(const repo of config.repos){
        try{

            console.log(`\n▶ Running Fetch in ${repo}`);

            execSync("git fetch", { cwd: repo, stdio: "inherit" });
        }catch(e){
            console.log("Error:",e)
        }
    }
}