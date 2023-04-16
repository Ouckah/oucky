const { SlashCommandBuilder } = require("discord.js");

// TODO: Fix error (I'm not sure what it is, a lot will be put with issue)

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play rock paper scissors against the bot! by Fluid#2654")
    .addStringOption((option) => {
      option
        .setName("choice")
        .setDescription("Choose rock, paper or scissors.")
        .setRequired(true)
        .addChoices(
          { name: "🪨 Rock", value: "rock" },
          { name: "📃 Paper", value: "paper" },
          { name: "✂️ Scissors", value: "scissors" }
        );
    }),
  async execute(interaction) {
    const variants = ["rock", "paper", "scissors"];
    const userChoice = interaction.options.getString("choice");
    const botChoice = variants[Math.floor(Math.random() * variants.length)];

    let result;
    switch (userChoice) {
      case botChoice:
        result = "It's a tie! 👍";
        break;
      case "rock":
        result =
          botChoice === "paper"
            ? "You lose, I chose paper. 📃"
            : "You win, I chose scissors! ✂️";
        break;
      case "paper":
        result =
          botChoice === "scissors"
            ? "You lose, I chose scissors. ✂️"
            : "You win, I chose rock! 🪨";
        break;
      case "scissors":
        result =
          botChoice === "rock"
            ? "You lose, I chose rock. 🪨"
            : "You win, I chose paper! 📃";
        break;
    }

    await interaction.reply(result);
  }
};
