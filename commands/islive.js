const { SlashCommandBuilder } = require('discord.js');
const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = "ouckah";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

module.exports = {
	data: new SlashCommandBuilder()

        // logistics
		.setName('islive')
		.setDescription('Check if ouckah is live right now!'),

	async execute(interaction) {
		await generateResponse(interaction);
	},
};

async function generateResponse(interaction) {
    // Connect to the chat (await can be used as well)
    tiktokLiveConnection.connect().then(state => {
        interaction.reply("Ouckah is live!")
    }).catch(err => {
        interaction.reply("Ouckah is offline! YOU BETTER GET BACK ON YOUR GAME.");
    })
} 
