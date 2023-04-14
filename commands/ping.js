module.exports = {
    name: `ping`,
   async execute(client, message, args) {
        message.reply({ content: `Pong!` })
    },
 };