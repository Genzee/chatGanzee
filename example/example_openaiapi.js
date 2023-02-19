const readline = require('readline');
const axios = require('axios');

const openaiAPIKey = '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'; // 자신의 OpenAI API Key 입력
const promptPrefix = 'You: ';
const responsePrefix = 'AI: ';

async function generateText(prompt) {
    const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiAPIKey}`
        },
        data: {
            prompt: prompt,
            max_tokens: 60,
            temperature: 0.7
        }
    });
    return response.data.choices[0].text;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: promptPrefix
});

rl.prompt();

rl.on('line', async (line) => {
    if (line === 'exit') {
        rl.close();
    } else {
        const text = await generateText(`${promptPrefix}${line}\n${responsePrefix}`);
        console.log(responsePrefix + text.trim());
        rl.prompt();
    }
});

rl.on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
});

