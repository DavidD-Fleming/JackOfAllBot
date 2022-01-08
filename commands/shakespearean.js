const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
// utility so the embed does not error if the value is over 1024 characters
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shakespearean')
		.setDescription('Translates text into Shakespearean!')
        .addStringOption(option => option.setName('text').setDescription('Enter the text to translate.').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
        const text = interaction.options.getString('text');

        // use URLSearchParams class to query the term so Shakespeare can parse it
        const query = new URLSearchParams( {text} );
        const { contents } = await fetch(`https://api.funtranslations.com/translate/shakespeare.json?${query}`).then(response => response.json());

        // make sure user is not overusing api calls
        if (!contents) {
            return interaction.editReply(`Prithee giveth wage oth'rwise waiteth one hour.`);
        }

        // get random act and scene
        const index = 'Act ' + (Math.floor(Math.random() * 5) + 1) + ', Scene ' + (Math.floor(Math.random() * 15) + 1) + '.';

        const embed = new MessageEmbed()
            .setColor('#964b00')
            .setTitle('A Discord\'s Tale')
            .setDescription(index)
            .addField(`${interaction.user.username}:`, contents.translated)
            .setImage(interaction.user.displayAvatarURL({ dynamic: true}))
        interaction.editReply({ embeds: [embed] });
	},
};