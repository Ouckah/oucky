// #region DISCORD CRAP


// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	// Set a new item in the Collection with the key as the command name and the value as the exported module
// 	if ('data' in command && 'execute' in command) {
// 		client.commands.set(command.data.name, command);
// 	} else {
// 		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 	}
// }

// #endregion DISCORD CRAP

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

// client interaction
client.on('messageCreate', async message => {

    const prefix = ';'
  
    if (!message.content.startsWith(prefix) || !message.content.startsWith('@Mr. Bob') || message.author.bot) return; // DO NOT CHANGE THIS
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase()
  
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
      command.execute(client, message, args);
    } catch (error) {
      console.error(error)
      return message.channel.send(`An error occured!`)
    }
  })