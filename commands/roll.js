const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Give random number between 0 and 100!'),

	async execute(interaction) {
        var num = Math.floor(Math.random()*101);
		return interaction.reply( `You rolled ${num}!`);
	},
};