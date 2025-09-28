const { SlashCommandBuilder } = require('discord.js');
const { ScraperContext } = require("2x10-webscraper")
const { ScraperHelper } = require("./../../helperScripts/webScraperHelper.js")

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('rule34')
		.setDescription('Get a random nsfw image or video from rule34 :3')
		.addStringOption(option => 
			option.setName('tags')
			.setDescription('Tags to be shown')
		)
		.addNumberOption(option =>
			option.setName('amount')
			.setDescription('Amount of content to be shown')
			.setMinValue(1)
			.setMaxValue(5)
		),
	async execute(interaction) 
	{
		try 
		{
			var usrTags = interaction.options.getString('tags')
			var usrAmount = interaction.options.getNumber('amount');

			if (!usrTags) usrTags = ""
			if (!usrAmount) usrAmount = 1
			
			const context = new ScraperContext
			({
			    site: "https://rule34.us",
			    query: "index.php?r=posts/index&q",
			    tags: usrTags,
				amount: usrAmount,
			    posts: 
			    {
			        container: ".thumbail-container",
			        tag: ["a"],
			        attribute: "href",
			    },  
			    post: 
			    {
			        container: ".content_push",
			        tag: ["img", "source"],
			        attribute: "src",
			    },
			    pages: 
			    {
			        container: ".pagination",
			        tag: ["a"],
			        attribute: "href",
			        query: {
			            name: "page",
			            min: 0,
			            max: 235,
			        },
			    },
			});
			
			ScraperHelper(interaction, context, usrTags, usrAmount)
		}
		catch(err)
		{
			console.log(err)
		}
	},
};