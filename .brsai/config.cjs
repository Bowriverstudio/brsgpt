require('dotenv').config();

module.exports = {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo-0613",
    temperature: 0.5,
    maxTokens: 2048,
}
