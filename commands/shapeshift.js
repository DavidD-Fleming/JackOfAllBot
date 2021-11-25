const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shapeshift')
		.setDescription('Turns into a selected user, or yourself!')
		.addUserOption(option => option.setName('target').setDescription('The user to turn into.')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) {
			interaction.client.user.setUsername('${user.username}');
			//return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}
		return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`);
	},
};