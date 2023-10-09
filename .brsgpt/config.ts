export interface Config {
    apiKey?: string;
    model: string;
    temperature: number;
    maxTokens: number;
}

export const config = {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo-0613",
    temperature: 0.5,
    maxTokens: 2048,
} satisfies Config;
