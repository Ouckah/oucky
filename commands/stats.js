const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows server stats!'),
	async execute(interaction) {
		await generateStats(interaction);
	},
};


async function generateStats(interaction)
{
  const message = await interaction.reply("Generating... :gear:");

  // get server stats
    const guild = interaction.guild;
    const roles = guild.roles.cache;
    const emojisCount = guild.emojis.cache.size; 
    const rolesCount = roles.size;

  message.edit([
    `:gear: Server stats:`,
    `:robot: Server name: ${guild.name}`,
    `:robot: Server ID: ${guild.id}`,
    `:robot: Server member count: ${guild.memberCount}`,
    `:robot: Server roles count: ${rolesCount}`
    `:robot: Server emojis count: ${emojisCount}`
  ].join("\n"));
}