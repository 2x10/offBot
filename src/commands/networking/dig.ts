import { AttachmentBuilder, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import dns from 'dns';
import fs from 'fs';

export default 
{
    data: new SlashCommandBuilder()
        .setName('dig')
        .setDescription('Performs a reverse DNS lookup on a given target')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('Valid query for dig -x')
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const query = interaction.options.getString('query', true);

        await interaction.deferReply(); // in case the lookup takes a moment

        try 
        {
            // Perform a reverse DNS lookup (dig -x)
            const hostnames = await new Promise<string[]>((resolve, reject) => {
                dns.reverse(query, (err, domains) => {
                    if (err) reject(err);
                    else resolve(domains);
                });
            });
        
            const output = `Reverse DNS (dig -x ${query})\n\n${hostnames.join('\n')}`;
        
            const filePath = `./tmp/dig-${query.replace(/\W+/g, '_')}.txt`;
            fs.writeFileSync(filePath, output);
        
            const embed = new EmbedBuilder()
                .setTitle(`Reverse DNS Lookup: ${query}`)
                .setDescription(hostnames.length ? hostnames.join(', ') : 'No PTR records found.')
                .setColor('Purple')
                .setFooter({ text: 'Powered by Node.js DNS' });
        
            const attachment = new AttachmentBuilder(filePath);
            await interaction.editReply({ embeds: [embed], files: [attachment] });
        
            fs.unlinkSync(filePath);
        } 
        catch (error) 
        {
            console.error(error)
            await interaction.editReply({
                content: `❌ Failed to resolve reverse DNS for ${query}: Internal error`,
            });
        }
    }
}