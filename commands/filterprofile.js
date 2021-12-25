const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('filterprofile')
		.setDescription('Puts a colored filter over a person\'s pfp!')
		.addUserOption(option => option.setName('person').setDescription('The user\'s avatar to show.').setRequired(true))
		.addIntegerOption(option => option.setName('r').setDescription('The r value. (0-255)').setRequired(true))
        .addIntegerOption(option => option.setName('g').setDescription('The g value. (0-255').setRequired(true))
        .addIntegerOption(option => option.setName('b').setDescription('The b value. (0-255)').setRequired(true))
        .addNumberOption(option => option.setName('a').setDescription('The alpha value. (0.0-1.0)').setRequired(true)),
	async execute(interaction) {
		// collect input
		const person = interaction.options.getUser('person');
		const r = interaction.options.getInteger('r');
        const g = interaction.options.getInteger('g');
        const b = interaction.options.getInteger('b');
        const a = interaction.options.getNumber('a');

		// check for correctness
		if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
			await interaction.reply({ content: `You have an incorrect rgb value (have to between 0-255).`, ephemeral: true });
			return;
		}
		if (a < 0 || a > 1) {
			await interaction.reply({ content: `Your alpha value is incorrect (has to between 0 and 1).`, ephemeral: true });
			return;
		}
		const a1 = Math.round(a * 10) / 10;

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
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a1})`;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

		// picture
		const attachment = new MessageAttachment(canvas.toBuffer(), 'filteredpfp.png');
		interaction.reply({ files: [attachment] });
	},
};