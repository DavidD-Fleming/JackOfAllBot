const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('parrot')
		.setDescription('Makes the bot repeat what you say!')
		.addStringOption(option => option.setName('input').setDescription('Enter the dialogue to repeat.')),
	async execute(interaction) {
		const dialogue = interaction.options.getString('input');
		if (dialogue) {
			return interaction.reply(`${dialogue}`);
		}
		return interaction.reply(`...`);
	},
};