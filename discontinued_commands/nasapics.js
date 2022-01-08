const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
// utility so the embed does not error if the value is over 1024 characters
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('nasapics')
		.setDescription('Sends a picture about something from the NASA database!')
        .addStringOption(option => option.setName('term').setDescription('Enter the term to look up.').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
        const q = interaction.options.getString('term');

        // use URLSearchParams class to query the term so NASA can parse it
        const query = new URLSearchParams( {q} );
        console.log(query);
        const { collection } = await fetch(`https://images-api.nasa.gov/search?${query}`).then(response => response.json());

        // check to make sure there is a definition
        if (!collection.items.length) {
            return interaction.editReply(`I could not find anything for **${term}**.`);
        }

        const [item] = collection.items;
        const [data] = item.data;
        const [link] = item.links;
        // embed the result
        const embed = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle(trim(data.title, 1024))
            // some links from NASA are wonky and contain spaces !!!!!!!!!!!!!!
            .setImage("link.href")
        interaction.editReply({ embeds: [embed] });
	},
};