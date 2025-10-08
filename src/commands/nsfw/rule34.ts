import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ScraperExample, ScraperSettings } from "2x10-webscraper"
import { ScraperHelper } from "./../../helperScripts/webScraperHelper.js"

export default 
{
	data: new SlashCommandBuilder()
		.setName('rule34')
		.setDescription('Get a random nsfw image or video from rule34 :3')
		.addStringOption(option => 
			option.setName('tags')
			.setDescription('Tags to be used')
		)
		.addNumberOption(option =>
			option.setName('amount')
			.setDescription('Amount of content to be shown')
			.setMinValue(1)
			.setMaxValue(5)
		),
	async execute(interaction: ChatInputCommandInteraction) 
	{
		try 
		{
			var usrTags = interaction.options.getString('tags')
			var usrAmount = interaction.options.getNumber('amount');

			if (!usrTags) usrTags = ""
			if (!usrAmount) usrAmount = 1
			
			const settings = new ScraperSettings
			({
				fetchThumbnails: true,
				fetchImageURLs: true,
				gotoSourcePage: true, 
				useHeaders: false,
				tags: usrTags,
				amount: usrAmount,
			})

			const context = new ScraperExample().rule34

			ScraperHelper(interaction, context, settings)
		}
		catch(err)
		{
			console.log(err)
		}
	},
};