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

// Le bot va lire le token depuis les variables sécurisées
client.login(process.env.DISCORD_TOKEN);
