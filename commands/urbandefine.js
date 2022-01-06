const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
// utility so the embed does not error if the value is over 1024 characters
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('urbandefine')
		.setDescription('Defines something using Urban Dictionary!')
        .addStringOption(option => option.setName('term').setDescription('Enter the term to define.')),
	async execute(interaction) {
		await interaction.deferReply();
        const term = interaction.options.getString('term');

        // use URLSearchParams class to query the term so Urban Dictionary can parse it
        const query = new URLSearchParams({ term });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        // check to make sure there is a definition
        if (!list.length) {
            return interaction.editReply(`I did not find a definition for **${term}**.`);
        }

        // embed the result
        const [answer] = list;
        const embed = new MessageEmbed()
            .setColor('#40e0d0')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
            )
            .setFooter(`${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`)
        interaction.editReply({ embeds: [embed] });
	},
};