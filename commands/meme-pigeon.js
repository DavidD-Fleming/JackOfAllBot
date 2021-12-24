const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme-pigeon')
		.setDescription('Draws the pigeon meme!')
		.addStringOption(option => option.setName('person').setDescription('The person guessing.').setRequired(true))
		.addStringOption(option => option.setName('butterfly').setDescription('The thing being guessed.').setRequired(true))
		.addStringOption(option => option.setName('guess').setDescription('The guess.').setRequired(true)),
	async execute(interaction) {
		// collect input
		const person = interaction.options.getString('person');
		const butterfly = interaction.options.getString('butterfly');
		const guess = interaction.options.getString('guess');

		// create 2D canvas
		const canvas = Canvas.createCanvas(700, 400);
		const context = canvas.getContext('2d');

		// choose background for canvas
		const background = await Canvas.loadImage('./meme_images/butterflyMeme.jpg');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		// make sure text looks right and fills it in
		context.strokeRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = '#ffffff';
		// -- person text
		fillItIn(context, canvas.width - 400, canvas.width / 3, canvas.height / 3, 50, `${person}`);
		// -- butterfly text
		fillItIn(context, canvas.width - 400, canvas.width / 1.35, canvas.height / 3.5, 50, `${butterfly}`);
		// -- guess text
		fillItIn(context, canvas.width - 200, canvas.width / 2, canvas.height, 70, `Is this ${guess}?`);

		// send meme
		const attachment = new MessageAttachment(canvas.toBuffer(), 'pigeonmeme.png');
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