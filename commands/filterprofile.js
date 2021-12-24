const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('filterprofile')
		.setDescription('Puts a colored filter over a person\'s pfp!')
		.addUserOption(option => option.setName('person').setDescription('The user\'s avatar to show.').setRequired(true))
		.addStringOption(option => option.setName('r').setDescription('The r value.').setRequired(true))
        .addStringOption(option => option.setName('g').setDescription('The g value.').setRequired(true))
        .addStringOption(option => option.setName('b').setDescription('The b value.').setRequired(true))
        .addStringOption(option => option.setName('a').setDescription('The alpha value.').setRequired(true)),
	async execute(interaction) {
		// collect input
		const person = interaction.options.getUser('person');
		const r = interaction.options.getString('r');
        const g = interaction.options.getString('g');
        const b = interaction.options.getString('b');
        const a = interaction.options.getString('a');

		// create 2D canvas
		const canvas = Canvas.createCanvas(500, 500);
		const context = canvas.getContext('2d');

		// draws pfp
        const avatar = await Canvas.loadImage(person.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 0, 0, canvas.width, canvas.height);

		// filter (or cupcake dog)
		if (r == 0 && g == 0 && b == 0) {
            const cupcakeDog = await Canvas.loadImage('./meme_images/cupcakeDog.PNG');
            context.globalAlpha = a;
		    context.drawImage(cupcakeDog, 0, 0, canvas.width, canvas.height);
        } else {
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

		// picture
		const attachment = new MessageAttachment(canvas.toBuffer(), 'filteredpfp.png');
		interaction.reply({ files: [attachment] });
	},
};