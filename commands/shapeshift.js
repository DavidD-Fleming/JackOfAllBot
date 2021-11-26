const { SlashCommandBuilder } = require('@discordjs/builders');
const { adminId } = require('./../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shapeshift')
		.setDescription('Turns into a selected user, or yourself!')
		.addUserOption(option => option.setName('target').setDescription('The user to turn into.')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (interaction.user.id === adminId) {
			if (user) {
				interaction.client.user.setUsername(`${user.username}`);
				interaction.client.user.setAvatar(`${user.displayAvatarURL({ dynamic: true })}`);
				await interaction.reply(`Hello! I am ${user.username}.`);
			} else {
				interaction.client.user.setUsername(`${interaction.user.username}`);
				interaction.client.user.setAvatar(`${interaction.user.displayAvatarURL({ dynamic: true })}`);
				await interaction.reply(`I am ${interaction.user.username}.`);
			}
		} else {
			await interaction.reply({ content: `You don't have the authentication to do this.`, ephemeral: true });
		}
	},
};