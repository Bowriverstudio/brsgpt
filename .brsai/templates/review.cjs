module.exports = {
    type: "commit",
    prompt: `
        {code}    
    `,
    system: `
     Consider the code provided by the prompt. 

     It is for this project: {project_description}

     It has these: {dependencies}

    Provide a code review.

    `
}
