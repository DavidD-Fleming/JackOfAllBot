const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme-handshake')
		.setDescription('Draws the handshake meme!')
		.addStringOption(option => option.setName('person_one').setDescription('The first thing').setRequired(true))
		.addStringOption(option => option.setName('person_two').setDescription('The second thing.').setRequired(true))
		.addStringOption(option => option.setName('agreement').setDescription('The thing they agree with.')),
	async execute(interaction) {
		// collect input
		const personOne = interaction.options.getString('person_one');
		const personTwo = interaction.options.getString('person_two');
		const agreement = interaction.options.getString('agreement');

		// create 2D canvas
		const canvas = Canvas.createCanvas(700, 400);
		const context = canvas.getContext('2d');

		// choose background for canvas
		const background = await Canvas.loadImage('./meme_images/handshakeMeme.jpg');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		// make sure text looks right and fills it in
		context.strokeRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = '#ffffff';
		// -- person one text
		fillItIn(context, canvas.width - 300, canvas.width / 4, canvas.height * 3/4, 70, `${personOne}`);
		// -- person two text
		fillItIn(context, canvas.width - 300, canvas.width / 1.35, canvas.height * 2/3, 70, `${personTwo}`);
		// -- agreement text
		if (agreement) {
			fillItIn(context, canvas.width - 300, canvas.width * 2/5, canvas.height * 2/7, 70, `${agreement}`);
		}

		// send meme
		const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
		interaction.reply({ files: [attachment] });
	},
};

// creates appopriate text (impact)
function fillItIn(context, fillInSize, xPosition, yPosition, initialFontSize, text) {
	var fontSize = fitText(fillInSize, context, initialFontSize, text);
	context.font = `${fontSize}px impact`;
	var shiftAmount = shiftLeft(fontSize, text);
	context.fillText(`${text}`, xPosition - shiftAmount, yPosition);
}

// size text so it fits the canvas
const fitText = (appSize, context, fontSize, text) => {
	do {
		context.font = `${fontSize -= 5}px impact`;
	} while (context.measureText(text).width > appSize);

	// Return the result to use in the actual canvas
	return fontSize;
};

// moves text to the left so it is centered
var shiftLeft = (fontSize, text) => {
	const textLength = text.length / 2;
	var shiftAmount = textLength * fontSize / 2.5;
	return shiftAmount;
}