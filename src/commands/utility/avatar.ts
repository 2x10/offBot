import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';

export default 
{
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target')
		.setDescription('The user\'s avatar to show')),
	async execute(interaction: ChatInputCommandInteraction) {
		const user = interaction.options.getUser('target');
 
		let message = ""
		var avatar = "";
		if (user)
		{
			message = `${user.username}'s avatar`
			avatar = user.displayAvatarURL()
		}
		else
		{
			message = `${interaction.user.username}'s avatar`
			avatar = interaction.user.displayAvatarURL()
		}
		

 		const embed = new EmbedBuilder()
 	       .setTitle(message)
 	       .setImage(avatar)
		   .setDescription("nice pfp!")
		   .setColor(0xFF00FF)
 	   await interaction.reply({ embeds: [embed] });
	},
};