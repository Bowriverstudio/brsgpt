type Commands = {
    command: string;
    description?: string;
}

const commands: Commands[] = [
    {
        command: "local-fetch-display",
        description: "Fetch from local directory, send to OpenAI, and display result"
    },
    {
        command: "local-fetch-clipboard",
        description: "Fetch from local, construct query, display in console & copy to clipboard"
    },
    {
        command: "api-fetch-display",
        description: "Fetch from API, send to OpenAI, and display result"
    },
    {
        command: "api-fetch-clipboard",
        description: "Fetch from API, construct query, display in console & copy to clipboard"
    },
    {
        command: "validate",
        description: "Validates the brs.config.js file"
    }
];

export default commands;