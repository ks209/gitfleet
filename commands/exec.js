const { loadConfig } = require("../core/config");

const { execSync } = require("child_process");



module.exports = function (command) {

    const config = loadConfig();

    for(const repo of config.repos){
        try{

            console.log(`\n▶ Running in ${repo}`);

            execSync(command, { cwd: repo, stdio: "inherit" });
        }catch(e){
            console.log("Error:",e)
        }
    }
}