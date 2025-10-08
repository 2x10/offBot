import  { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default 
{
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.setDMPermission(false),
	async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.guild) 
        {
            await interaction.reply({ content: "This command must be used in a server!", ephemeral: true });
            return;
        }

		await interaction.reply(`This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`);
	},
};