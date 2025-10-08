import  { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel } from 'discord.js';
export default 
{
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clears messages between 1 and 100')
        .setDMPermission(false)
        .addNumberOption(option => 
            option.setName('amount')
            .setDescription('Number of messages to delete')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        ),
        userPermissions: [PermissionFlagsBits.ManageMessages],
        botPermissions: [PermissionFlagsBits.ManageMessages],

    async execute(interaction: ChatInputCommandInteraction) {
        const amount = interaction.options.getNumber('amount', true);
        await interaction.deferReply();

        if (!interaction.guild) 
        {
            await interaction.editReply("This command must be used in a server!");
            return;
        }

        const channel = interaction.channel;
        if (!channel || !('bulkDelete' in channel)) 
        {
            await interaction.editReply("Cannot delete messages in this channel.");
            return;
        }

        await (channel as TextChannel).bulkDelete(amount, true);
        await interaction.editReply(`Deleted ${amount} messages!`);
    }
}