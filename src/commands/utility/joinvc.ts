import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';


export default {
	data: new SlashCommandBuilder()
		.setName('joinvc')
		.setDescription("Make the bot join a voice channel")
		.addStringOption(option =>
			option
				.setName('channelid')
				.setDescription('Voice channel ID to join')
				.setRequired(false)
		),

	async execute(interaction: ChatInputCommandInteraction) {
		const member = interaction.member as GuildMember;

		// Get optional channel ID
		const channelIdOption = interaction.options.getString('channelid');

		let channel;

		if (channelIdOption) {
			// Try to fetch the channel by ID
			channel = interaction.guild?.channels.cache.get(channelIdOption);
			
			if (!channel || channel.type !== 2) { // 2 = GuildVoice
				return interaction.reply({
					content: "Invalid voice channel ID.",
					ephemeral: true
				});
			}
		} else {
			// No ID provided → check if user is in a voice channel
			if (!member.voice.channel) {
				return interaction.reply({
					content: "You are not in a voice channel.",
					ephemeral: true
				});
			}

			channel = member.voice.channel;
		}

		// Join the channel
		joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		await interaction.reply(`Joined **${channel.name}** 🎧`);
	},
};