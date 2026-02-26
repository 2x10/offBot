import  { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages between 1 and 100')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const amount = interaction.options.getNumber('amount', true);
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.guild) {
            return interaction.editReply("This command must be used in a server!");
        }

        const channel = interaction.channel;

        if (!channel || !('bulkDelete' in channel)) {
            return interaction.editReply("Cannot delete messages in this channel.");
        }

        await (channel as TextChannel).bulkDelete(amount, true);
        await interaction.editReply(`Deleted ${amount} messages!`);
    }
};