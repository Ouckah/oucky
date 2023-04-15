const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Randomly insults a user. (Use carefully!)'),
	async execute(interaction) {
		await generateInsult(interaction);
	},
};

async function generateInsult(interaction) {
    axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json')
    .then(async (response) => {
        const data = response.data;
        await interaction.reply(data.insult);
    })
    .catch(async (err) => {
        console.error(err);
        await interaction.reply("error. u suck lol.");
    });  
}