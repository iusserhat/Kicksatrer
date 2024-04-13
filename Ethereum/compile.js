const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

const source = fs.readFileSync(campaignPath, "utf8");


const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

 const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Campaign.sol"];

 fs.ensureDirSync(buildPath);

 for(let contract in output){
     fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
     );
 }

 for (let contract in output) {
    const contractPath = path.resolve(buildPath, contract + ".json");
    fs.outputJSONSync(contractPath, output[contract]);
    console.log(`Contract ${contract} written to ${contractPath}`);
}


