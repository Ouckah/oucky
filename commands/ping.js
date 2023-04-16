const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with actual bot ping! by Fluid#2654"),
  async execute(interaction) {
    await ping(interaction)
  },
};

async function ping(interaction)
{
  const message = await interaction.reply("Pinging... :ping_pong:");
  const ping = interaction.client.ws.ping;

  message.edit([
    `:ping_pong: Client ping: ${message.createdTimestamp - interaction.createdTimestamp}ms`,
    `:robot: WebSocket ping: ${ping}ms`
  ].join("\n"));
}
