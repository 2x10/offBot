import { ScrapeFast, ScraperContext, ScraperSettings } from "2x10-webscraper";
import { ChatInputCommandInteraction   } from "discord.js";

export async function ScraperHelper (interaction: ChatInputCommandInteraction, context: ScraperContext, settings: ScraperSettings)
{
    try 
	{
		await interaction.deferReply();

		const response = await ScrapeFast(context, settings);

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