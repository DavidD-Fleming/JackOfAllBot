const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('textprofile')
		.setDescription('Puts text over a person\'s pfp!')
		.addUserOption(option => option.setName('person').setDescription('The user\'s avatar to show.').setRequired(true))
        .addStringOption(option => option.setName('text').setDescription('The text to put in the image.').setRequired(true))
        .addBooleanOption(option => option.setName('sparkles').setDescription('Sparkles?').setRequired(true)),
	async execute(interaction) {
		// collect input
		const person = interaction.options.getUser('person');
		const text = interaction.options.getString('text');
        const addSparkles = interaction.options.getBoolean('sparkles');

		// create 2D canvas
		const canvas = Canvas.createCanvas(500, 500);
		const context = canvas.getContext('2d');

		// draws pfp
        const avatar = await Canvas.loadImage(person.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        // adds glitter
        if (addSparkles) {
            const sparkle = await Canvas.loadImage('./meme_images/sparkle.PNG');
		    context.drawImage(sparkle, 0, 0, canvas.width, canvas.height);
        }

		// draws text
        context.shadowBlur = 5;
        context.shadowColor = "white";
        context.font = "bold 80px monospace";
        context.textAlign = "center";
		context.fillText(text, canvas.width/2, canvas.height - 10, canvas.width);

		// picture
		const attachment = new MessageAttachment(canvas.toBuffer(), 'textpfp.png');
		interaction.reply({ files: [attachment] });
	},
};