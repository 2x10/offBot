const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears messages between 1 and 100')
        .addNumberOption(option => 
            option.setName('amount')
            .setDescription('Number of messages to delete')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        ),
        userPermissions: [PermissionFlagsBits.ManageMessages],
        botPermissions: [PermissionFlagsBits.ManageMessages],
    async execute(interaction) {
        const amount = interaction.options.getNumber('amount');

        await interaction.channel.bulkDelete(amount);
        await interaction.reply('Messages deleted');
    }
}