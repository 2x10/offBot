import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('everyone')
        .setDescription('Replies with @everyone'),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({ content: '@everyone' });
    },
};