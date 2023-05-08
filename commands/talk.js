const { SlashCommandBuilder } = require('discord.js');

// openai api
const { openaiKey } = require('../config.json');

// axios
const axios = require('axios');
const client = axios.create({
    headers: {
        Authorization: "Bearer " + openaiKey,
    },
});

module.exports = {
	data: new SlashCommandBuilder()

        // logistics
		.setName('talk')
		.setDescription('Talk to an AI!')

        // options
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to give to our AI!')
                .setRequired(true)),

	async execute(interaction) {
		await generateResponse(interaction);
	},
};

async function generateResponse(interaction) {

    const input = interaction.options.getString('input');

    const params = {
        prompt: input,
        model: "text-davinci-003",
        max_tokens: 10,
        temperature: 0,
    };

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