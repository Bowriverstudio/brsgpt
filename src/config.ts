import enquirer from "enquirer";

import fs from 'fs';

const LOCAL_CONFIG_PATH = `${process.cwd()}/.brsgpt/config.cjs`;


// if (fs.existsSync(LOCAL_CONFIG_PATH)) {
//     console.log(`${LOCAL_CONFIG_PATH} exists!`);
// } else {
//     console.log(`${LOCAL_CONFIG_PATH} does not exist.`);
// }

export const getConfig = async () => {
    if (fs.existsSync(LOCAL_CONFIG_PATH)) {
        import(`${LOCAL_CONFIG_PATH}`).then((config) => {
            console.log("CONFIG", config);
        }).catch((error) => {
            console.error("Error importing config:", error);
        });
    } else {
        // @todo add setup code.
        console.error(`${LOCAL_CONFIG_PATH} does not exist.`);
        return false;
    }


    console.log("CommitGPT 🤖");
}

// import { getConfig, setGlobalConfig } from "./config_storage.js";

// async function promptToken() {
//     try {
//         const answer = await enquirer.prompt<{ apikey: string }>({
//             type: "password",
//             name: "apikey",
//             message: "Paste your OpenAI apikey here:",
//         });

//         return answer.apikey;
//     } catch (e) {
//         console.log("Aborted.");
//         process.exit(1);
//     }
// }

// export async function getApiKey(clean?: boolean): Promise<string> {
//     let apiKey = getConfig<string | undefined>("apiKey");

//     console.log("apiKey: ", process.env.OPENAI_API_KEY)
//     return process.env.OPENAI_API_KEY;

//     if (clean) {
//         apiKey = undefined;
//     }

//     if (!apiKey) {
//         apiKey = await promptToken();
//         setGlobalConfig("apiKey", apiKey);
//     }

//     return apiKey;
// }

// export async function getPromptOptions(): Promise<{
//     model: string;
//     temperature: number;
//     maxTokens: number;
// }> {
//     const model = getConfig<string>("model");
//     const temperature = getConfig<number>("temperature");
//     const maxTokens = getConfig<number>("maxTokens");

//     return {
//         model,
//         temperature,
//         maxTokens,
//     };
// }
