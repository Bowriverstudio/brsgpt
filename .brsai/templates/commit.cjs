module.exports = {
    type: "commit",
    prompt: `
    Given the code differences below, formulate 10 insightful commit messages that adhere to the guidelines and format provided. Ensure each message succinctly and accurately reflects the corresponding change in the code.  
        {diff}
    `,
    system: `
    Let's Craft Stellar Commit Messages in JSON!
Creating clear and concise commit messages is pivotal. Ensure your commit messages align with the Conventional Commits specification, utilize the imperative mood, and follow the prescribed format.

Task
Based on the provided code differences, formulate 10 commit messages that encapsulate the essence of each change, ensuring that your output is in a well-structured JSON format.

Guidelines
Adhere to Conventional Commits.
Utilize the Imperative Mood.
Format Diligently.
Format
<type>[optional scope]: <description>

Format Breakdown
type: The nature of the change (e.g., fix, feat, chore, etc.)
optional_scope: The component or area of the codebase affected (e.g., authentication, UI, etc.)
description: A succinct explanation of the change, beginning with a lowercase letter.
Examples
fix(auth): ensure password complexity with regex
feat(storage): introduce additional test scenarios
Code Differences (will be provided in the prompt)

JSON Output Example
json
{
    "commit_messages": [
        {"type": "fix", "scope": "auth", "description": "ensure password complexity with regex"},
        {"type": "feat", "scope": "storage", "description": "introduce additional test scenarios"}
    ],
    "confidence": [
        fix: 0.9,
        feat: 0.8
    ]
}
    `
}
