const { loadConfig } = require("../core/config");

const { execSync } = require("child_process");



module.exports = function () {

    const config = loadConfig();

    for(const repo of config.repos){
        try{

            console.log(`\n▶ ${repo} : `);

            execSync("git branch", { cwd: repo, stdio: "inherit" });
        }catch(e){
            console.log("Error:",e)
        }
    }
}