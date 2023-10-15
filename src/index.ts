#!/usr/bin/env node

import pkg from 'enquirer';
//@ts-ignore
const { prompt, Select } = pkg;
import chalk from 'chalk';
import { spawn } from "child_process"
import commands from "./commands.js"

interface PromptResult {
    selectedCommand: string;
}

async function main() {
    const userCommand = process.argv[2];
    const userArgs = process.argv.slice(3); // Get arguments after the command

    if (userCommand) {
        const isValidCommand = commands.some(cmd => cmd.command === userCommand);
        if (isValidCommand) {
            executeCommand(userCommand, userArgs);
        } else {
            promptForCommand();
        }
    } else {
        await promptForCommand();
    }
}

const getHint = (index) => {
    const description = commands[index] && commands[index].description ? commands[index].description : '';
    return `\n\n${chalk.bgBlue(' Hint ')} ${chalk.blue(description)}\n\n`;  // Add styling here
};

async function promptForCommand() {
    const commandOptions = commands.map(({ command }) => command);

    const selectPrompt = new Select({
        name: 'selectedCommand',
        message: 'Which command do you want to execute?',
        choices: commandOptions,
        hint: 'Please use arrow keys to navigate and select an action.',
        footer: () => getHint(selectPrompt.index) // Use the current index of selectPrompt to get the hint


    });

    const response = await selectPrompt.run();
    console.log(`You selected: ${response}`);
    executeCommand(response);
}

function executeCommand(command, args = []) {
    const scriptPath = `./dist/scripts/${command}.js`;
    const child = spawn('node', [scriptPath, ...args], {
        stdio: 'inherit'  // This will ensure that the script's output is displayed in the main process
    });

    child.on('error', (err) => {
        console.error(`Failed to execute script: ${scriptPath}`);
        console.error(err);
    });

    child.on('exit', (code) => {
        console.log(`Script ${scriptPath} exited with code ${code}`);
    });
}

main().catch(console.error);



// // import { execSync } from "child_process";
// // import { getConfig } from "./config.js"
// // const { Select } = require('enquirer');
// import pkg from 'enquirer';
// const { prompt } = pkg;

// import child_process from 'child_process';
// const { spawn } = child_process;

// // import path from 'path';
// // const path = require('path');
// // const projectRoot = path.resolve(__dirname, '../../');
// // require('dotenv').config({ path: `${projectRoot}/.env.local` });

// interface PromptResult {
//     selectedCommand: string;
// }

// const commands = [
//     // ... your previous commands ...

//     {
//         command: "local-fetch-display",
//         script: "local-fetch-display.js",
//         description: "Fetch from local directory, send to OpenAI, and display result"
//     },
//     {
//         command: "local-fetch-clipboard",
//         script: "local-fetch-clipboard.js",
//         description: "Fetch from local, construct query, display in console & copy to clipboard"
//     },
//     {
//         command: "api-fetch-display",
//         script: "api-fetch-display.js",
//         description: "Fetch from API, send to OpenAI, and display result"
//     },
//     {
//         command: "api-fetch-clipboard",
//         script: "api-fetch-clipboard.js",
//         description: "Fetch from API, construct query, display in console & copy to clipboard"
//     },
//     {
//         command: "validate",
//         script: "validate.js",
//         description: "Validates the brs.config.js file"
//     }
// ];

// async function main() {
//     const userCommand = process.argv[2];
//     console.log("userCommand", process.argv)
//     if (userCommand) {
//         const isValidCommand = commands.some(cmd => cmd.command === userCommand);

//         if (isValidCommand) {
//             runCommand(userCommand);
//         } else {
//             console.log(`'yarn brsai ${userCommand}' is not a valid command. Please use one of the following:`);
//             displayAvailableCommands();
//             process.exit(); // Exit with an error code.
//         }
//     } else {
//         promptForCommand();
//     }
// }

// function displayAvailableCommands() {
//     commands.forEach(({ command, description }) => {
//         console.log(`yarn brsai ${command} - ${description}`);
//     });
// }

// async function promptForCommand() {
//     const commandOptions = commands.map(({ command, description }) => ({
//         name: command,
//         message: `${command} - ${description}`,
//         value: command
//     }));

//     const response = await prompt({
//         type: 'select',
//         name: 'selectedCommand',
//         message: 'Which command do you want to execute?',
//         choices: commandOptions
//     }) as PromptResult;

//     runCommand(response.selectedCommand);
// }

// function runCommand(userCommand) {
//     const selectedCommand = commands.find(cmd => cmd.command === userCommand);

//     // if (selectedCommand) {
//     //     console.log(`Executing 'yarn brsai ${selectedCommand.command}', which will ${selectedCommand.description}`);

//     //     const child = spawn(
//     //         'node',
//     //         [path.resolve(__dirname, `scripts/${selectedCommand.script}`)],
//     //         { stdio: 'inherit', env: process.env } // Forward stdio to the child process
//     //     );

//     //     child.on('close', (code) => {
//     //         console.log(`child process exited with code ${code}`);
//     //     });

//     // } else {
//     //     console.log(`'yarn brsai ${userCommand}' is not a valid command. Please use one of the following:`);
//     //     displayAvailableCommands();
//     // }
// }


// main().catch(console.error);


// // getConfig()
// // import path from 'path';

// // // ...
// // const argv = process.argv.slice(2);

// // const configFilePath = path.resolve(process.cwd(), argv[1]);

// // import(configFilePath).then((config) => {
// //     console.log("config", config);
// // }).catch((error) => {
// //     console.error("Error importing config:", error);
// // });



// // console.log(LOCAL_CONFIG_PATH);



// // const argv = process.argv.slice(2);
// // const configFilePath = argv[1]; // assuming '--config' is argv[0] and the path is argv[1]
// // console.log("configFilePath", configFilePath)
// // import(`./${configFilePath}`).then((config) => {
// //     console.log("CONFIG", config);
// // }).catch((error) => {
// //     console.error("Error importing config:", error);
// // });

// // let diff = "";
// // try {
// //     diff = execSync("git diff --cached -- . ':(exclude)package-lock.json' ':(exclude)yarn.lock'").toString();
// //     if (!diff) {
// //         console.log("No changes to commit. Exiting...");
// //         process.exit(0);
// //     }
// // } catch (e) {
// //     console.log("Failed to run git diff --cached");
// //     process.exit(1);
// // }

// // console.log("diff", diff)



// // import { config } from "./.brsgpt/config"


// // console.log("configuration", configuration)

// console.log("CommitGPT 🤖");
