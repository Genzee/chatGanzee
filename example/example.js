import dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('open ai key : ', process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

//const readline = require('readline');
import readline from 'readline';

const cl = readline.createInterface({
        input : process.stdin,
        output : process.stdout
});

async function generateText(prompt) {
    const completionParams = {
        model: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 60,
        n: 1,
        stop: null,
        temperature: 0.7
    };
 
    try {
        const response = await openai.createCompletion(completionParams);
        const text = response.data.choices[0].text;
        return text;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

function promptUser() {
  cl.question('You: ', async (answer) => {
          const text = await generateText(answer);
          console.log('GenzeeBot: ', text);
          promptUser();
  });
}

promptUser();
