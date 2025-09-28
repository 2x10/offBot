const { SlashCommandBuilder } = require('discord.js');
const { ScraperContext } = require("2x10-webscraper")
const { ScraperHelper } = require("../helperScripts/webScraperHelper.js")

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('e621')
		.setDescription('Get a random nsfw image or video from e621.net')
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
                site: "https://e621.net",
                query: "posts?tags",
                tags: usrTags,
            	amount: usrAmount,
                posts: 
                {
                    container: ".posts-container",
                    tag: ["a"],
                    attribute: "href",
                },  
                post: 
                {
                    container: "#image-container",
                    tag: ["img", "video"],
                    attribute: "src",
                },
                pages: 
                {
                    container: ".pagination",
                    tag: ["a"],
                    attribute: "href",
                    query: {
                        name: "page",
                        min: 1,
                        max: 100,
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