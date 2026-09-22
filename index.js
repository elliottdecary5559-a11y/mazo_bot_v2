const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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

// Écoute des messages envoyés dans le chat
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Commande pour lancer une alerte
  if (message.content === '/alerte-oeuf') {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('claim_egg')
        .setLabel('🥚 Récupérer l\'œuf !')
        .setStyle(ButtonStyle.Success)
    );

    await message.channel.send({
      content: '🚨 **UN ŒUF RARE VIENT D\'APPARAÎTRE !** 🚨\nCliquez vite sur le bouton ci-dessous pour le voler !',
      components: [row]
    });
  }
});

// Écoute des clics sur les boutons
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'claim_egg') {
    await interaction.reply({
      content: `🎉 Bravo ${interaction.user} ! Tu as été le plus rapide et tu as récupéré l'œuf !`,
      ephemeral: false
    });
  }
});

// Connexion sécurisée via la variable d'environnement de Railway
client.login(process.env.DISCORD_TOKEN);
