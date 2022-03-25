const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { NASAKey } = require('./../config.json');
// utility so the embed does not error if the value is over 1024 characters
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('spacepic')
		.setDescription('Sends the Astronomy Picture of the Day!'),
	async execute(interaction) {
		await interaction.deferReply();
		const { copyright, date, explanation, hdurl, title } = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASAKey}`).then(response => response.json());
        console.log(hdurl);

        // embed the result
        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle(trim(`${date}: ${title}`, 1024))
            .setImage(hdurl)
            .setDescription(trim(explanation, 1024))
            .setFooter(`© ${copyright}`)
        interaction.editReply({ embeds: [embed] });
	},
};