import fs from 'fs';
import { promises as fsPromises } from 'fs';

type BrsAiConfig = {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
};


const LOCAL_CONFIG_PATH = `${process.cwd()}/.brsai/config.cjs`;

export const getConfig = async (): Promise<BrsAiConfig | false> => {
    if (await fsPromises.access(LOCAL_CONFIG_PATH, fs.constants.F_OK).then(() => true).catch(() => false)) {
        try {
            const importedConfig = await import(`${LOCAL_CONFIG_PATH}`);
            const config: BrsAiConfig = importedConfig.default || importedConfig;

            return config;
        } catch (error) {
            console.error("Error importing config:", error);
            return false;
        }
    } else {
        console.error(`${LOCAL_CONFIG_PATH} does not exist.`);
        return false;
    }
};

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
