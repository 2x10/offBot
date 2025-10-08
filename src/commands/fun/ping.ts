import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { performance } from 'perf_hooks';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and shows interaction latency'),

    async execute(interaction: ChatInputCommandInteraction) {
		const start = performance.now();

        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const end = performance.now();
		const duration = (end - start).toFixed(2); 
        // sent is a Message type; calculate round-trip latency
        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply(`Pong! 🏓 Here are some informations on how this message reached to here:\nInteraction execution time: ${duration}ms\nRound-trip latency: ${latency}ms`);
    },
};