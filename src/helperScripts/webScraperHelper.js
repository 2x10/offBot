const { ScrapeFast } = require("2x10-webscraper");

async function ScraperHelper (interaction, context)
{
    try 
	{
		await interaction.deferReply();

		const response = await ScrapeFast(context);
		//const response = await fetch(`http://localhost:3000/scrape?tags=${usrTags}&amount=${usrAmount}`)

		if (response.code == 200)
		{
			var content = response.content
			var reply = ""
			for (var i = 0; i < content.length; i++)
			{
				reply = reply + `[${i+1}](${content[i].img}) `
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
		catch (_) {}
	}
}

module.exports = { ScraperHelper };