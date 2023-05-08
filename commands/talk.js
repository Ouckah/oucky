const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');
const { openaiKey } = require('../config.json');

const client = axios.create({
    headers: {
        Authorization: "Bearer " + openaiKey,
    },
});

const params = {
    prompt: "How are you?",
    model: "text-davinci-003",
    max_tokens: 10,
    temperature: 0,
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('talk')
		.setDescription('Talk to an AI!'),
	async execute(interaction) {
		await generateResponse(interaction);
	},
};

async function generateResponse(interaction) {
    client
        .post("https://api.openai.com/v1/completions", params)
        .then((result) => {
            const response = result.data.choices[0].text;
            interaction.reply(response);
        })
        .catch((err) => {
            console.log(err);
        })
}