const { Scrape } = require("2x10-webscraper")

async function ScraperHelper (interaction, context, usrTags, usrAmount)
{
    try {
		await interaction.deferReply();

		const response = await Scrape(context);
		if (response.code == 200)
		{
			var URL = response.content
			var reply = ""
			for (var i = 0; i < usrAmount; i++)
			{
				reply = reply + `[${i+1}](${URL[i]}) `
			}
			await interaction.editReply(reply);
		}
		else if (response.code == 204) {await interaction.editReply(response.message)}
		else
		{
			await interaction.editReply(response.message)
		}
	}
	catch(err) 
	{
		console.error("Interaction failed:", err);
		try 
		{
		    if (interaction.deferred || interaction.replied) {
		        await interaction.editReply("❌ Something went wrong.");
		    } else {
		        await interaction.reply("❌ Something went wrong.");
		    }
		} 
		catch (why) {}
	}
}

module.exports = { ScraperHelper };