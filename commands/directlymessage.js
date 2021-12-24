const { SlashCommandBuilder } = require('@discordjs/builders');
const { adminId } = require('./../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('directlymessage')
		.setDescription('(Admin Only) Directly message a user with a dialogue!')
		.addUserOption(option => option.setName('target').setDescription('The user to message.').setRequired(true))
		.addStringOption(option => option.setName('dialogue').setDescription('The message to send.').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const dialogue = interaction.options.getString('dialogue');
		if (interaction.user.id === adminId) {
			user.send(`${dialogue}`);
			await interaction.reply({ content: `Message sent.`, ephemeral: true });
		} else {
			await interaction.reply({ content: `You don't have the authentication to do this.`, ephemeral: true });
		}
	},
};