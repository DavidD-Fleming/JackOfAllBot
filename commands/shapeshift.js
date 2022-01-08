const { SlashCommandBuilder } = require('@discordjs/builders');
const { adminId } = require('./../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shapeshift')
		.setDescription('(Admin Only) Turns into a selected user or Jack Bot base form!')
		.addUserOption(option => option.setName('target').setDescription('The user to turn into.')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (interaction.user.id === adminId) {
			try {
				if (user) {
					interaction.client.user.setUsername(`${user.username}`);
					interaction.client.user.setAvatar(`${user.displayAvatarURL({ dynamic: true })}`);
					await interaction.reply({ content: `I have become ${user.username}.`, ephemeral: true});
				} else {
					interaction.client.user.setUsername('Jack Bot');
					interaction.client.user.setAvatar('./meme_images/lowpolyraccoon.PNG');
					await interaction.reply({ content: `I am Jack Bot.`, ephemeral: true});
				}
			} catch (DiscordAPIError) {
				await interaction.reply({ content: `The bot is being changed too much! Please wait one hour.`, ephemeral: true });
			}
		} else {
			await interaction.reply({ content: `You don't have the authentication to do this.`, ephemeral: true });
		}
	},
};