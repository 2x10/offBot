import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';

export default 
{
	data: new SlashCommandBuilder()
		.setName('borzoi')
		.setDescription('sends funny borzoi picture'),
	async execute(interaction: ChatInputCommandInteraction) {
    const response = await fetch("https://dog.ceo/api/breed/borzoi/images/random/");
    const data = await response.json();

 	const embed = new EmbedBuilder()
 	    .setTitle("funny borzoi picture")
 	    .setImage(data.message)
		.setDescription("haha funny dog")
		.setColor(0xFF00FF)
 	await interaction.reply({ embeds: [embed] });
	},
};