const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`🤖 Bot connecté sous le nom de : ${client.user.tag}`);
});

client.login('MTU1MTk1NjE5NzQwNDMxMTU1Mg.GsQLKS.FCIqEXJugJIzXZu6SczaPxNiiSM7J4yfrNzS1I');
