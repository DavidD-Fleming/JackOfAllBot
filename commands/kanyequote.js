const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('kanyequote')
		.setDescription('Sends a random Kanye West quote!'),
	async execute(interaction) {
		await interaction.deferReply();
		const { quote } = await fetch('https://api.kanye.rest').then(response => response.json());

        // embed the quote with a Kanye picture
        const embed = new MessageEmbed()
            .setColor('#4169e1')
            .setTitle('Kanye West')
            .setImage('https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_42/3513498/211019-ye-kanye-west-mb-1112.JPG')
            .setDescription(`${quote} -Kanye West`)
            .setFooter('© Kanye West')
        interaction.editReply({ embeds: [embed] });
	},
};