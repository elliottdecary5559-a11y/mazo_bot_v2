const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');

// Initialisation du bot avec les autorisations requises
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// CONFIGURATION : Remplacez avec votre vrai Token
const TOKEN = 'MTU1MTk1NjE5NzQwNDMxMTU1Mg.G8y_Jm.7sL1LLjnCnFDe6OVfWWbXJE7xP_jCFlId4kszg';
const CLIENT_ID = '1551412353353125958';

// Mémoire pour stocker les salons abonnés
const alertChannels = new Set();

// Définition de la commande /alerte-oeuf
const commands = [
    new SlashCommandBuilder()
        .setName('alerte-oeuf')
        .setDescription('Configure les alertes pour les œufs dans Steal an Egg')
        .addStringOption(option =>
            option.setName('rarete')
                .setDescription('Sélectionnez la rareté minimale à surveiller')
                .setRequired(true)
                .addChoices(
                    { name: 'Mythic 🟣', value: 'Mythic' },
                    { name: 'Legendary 🟡', value: 'Legendary' },
                    { name: 'Secret 🔴', value: 'Secret' }
                )
        )
];

// Chargement des commandes Slash auprès de Discord
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once('ready', async () => {
    console.log(`🤖 Bot connecté sous le nom de : ${client.user.tag}`);

    try {
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('✅ Commande /alerte-oeuf chargée avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors du chargement des commandes :', error);
    }
});

// Écoute de la commande /alerte-oeuf
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'alerte-oeuf') {
        const rarete = interaction.options.getString('rarete');
        alertChannels.add(interaction.channelId);

        const embed = new EmbedBuilder()
            .setTitle('🥚 Surveillance Activée !')
            .setDescription(`Le bot **Mazo** surveille désormais le jeu *Steal an Egg*.\nAlertes configurées pour la rareté : **${rarete}** et supérieure.`)
            .setColor(0x00FF00)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
});

// Connexion du bot
client.login(TOKEN);
