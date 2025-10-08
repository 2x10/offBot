import { AttachmentBuilder, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import whois from 'whois-json';
import fs from 'fs';

export default {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Performs a WHOIS lookup on a domain or IP')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('The domain or IP to lookup')
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const query = interaction.options.getString('query', true);

        await interaction.deferReply(); // in case the lookup takes a moment

        try {

            const result = await whois(query);

            // Convert the result object to readable text
            const output = typeof result === 'object'
                ? JSON.stringify(result, null, 2)
                : String(result);

            // Create a text file
            const filePath = `./tmp/whois-${query.replace(/\W+/g, '_')}.txt`;
            fs.writeFileSync(filePath, output);

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle(`WHOIS Lookup: ${query}`)
                .setDescription('Full WHOIS data attached below.')
                .setColor('Purple')
                .setFooter({ text: 'Powered by whois-json' });

            // Send the message with the file attached
            const attachment = new AttachmentBuilder(filePath);
            await interaction.editReply({
                embeds: [embed],
                files: [attachment],
            });

            // Optionally clean up the file afterwards
            fs.unlinkSync(filePath);
        }
        catch (error) 
        {
            console.error(error);
            await interaction.editReply({ content: `Failed to fetch WHOIS info for \`${query}\`.: Internal error` });
        }
    },
};