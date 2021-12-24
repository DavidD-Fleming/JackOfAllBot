const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme-pushup')
		.setDescription('Draws the pushup meme!')
		.addUserOption(option => option.setName('person').setDescription('The user\'s avatar to show.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason the person does a pushup.').setRequired(true)),
	async execute(interaction) {
		// collect input
		const user = interaction.options.getUser('person');
		const reason = interaction.options.getString('reason').toUpperCase();
		var avatarSideDim = 80;

		// create 2D canvas
		const canvas = Canvas.createCanvas(600, 600);
		const context = canvas.getContext('2d');

		// choose background for canvas
		const background = await Canvas.loadImage('./meme_images/pushupMeme.PNG');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		// make sure text looks right and fills it in
		context.strokeRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = '#000000';
		// -- user avatar
		const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 70, 60, avatarSideDim, avatarSideDim);
		avatarSideDim = 90;
		context.drawImage(avatar, 370, 50, avatarSideDim, avatarSideDim);
		context.drawImage(avatar, 80, 340, avatarSideDim, avatarSideDim);
		// -- reason text
		fillItIn(context, canvas.width * 5.3/7, canvas.height * 0.8/7, 17, `${reason}`);

		// send meme
		const attachment = new MessageAttachment(canvas.toBuffer(), 'pushupmeme.png');
		interaction.reply({ files: [attachment] });
	},
};

// creates appopriate text (impact)
function fillItIn(context, xPosition, yPosition, initialFontSize, text) {
	var stringArray = text.split(' ');
	context.font = `bold ${initialFontSize}px comic sans ms`;
	context.textAligh = "center";
	var shiftAmount = shiftLeft(initialFontSize, text);
	
	// prints text in different lines
	var stringLength = 0;
	var newXPosition = xPosition;
	for (var i = 0; i < stringArray.length; i++) {
		stringLength += stringArray[i].length;
		if (stringLength >= 12) {
			stringLength = stringArray[i].length;
			yPosition += 15;
			newXPosition = xPosition;
			context.fillText(`${stringArray[i]}`, newXPosition, yPosition);
		} else {
			context.fillText(`${stringArray[i]}`, newXPosition, yPosition);		
		}
		newXPosition += stringArray[i].length * 12;
		
	}
}

// moves text to the left so it is centered
var shiftLeft = (fontSize, text) => {
	const textLength = text.length / 2;
	var shiftAmount = textLength * fontSize / 2.5;
	return shiftAmount;
}