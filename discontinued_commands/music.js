const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const { voiceChannelId } = require('./../config.json');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('Plays a video from Youtube!')
        .addStringOption(option => option.setName('video').setDescription('Video to play.')),
    async execute(interaction) {
        const video = interaction.options.getString('dialogue');

        const connection = joinVoiceChannel({
            channelId: voiceChannelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        
        const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();
        
        player.play(resource);
        connection.subscribe(player);
        
        player.on(AudioPlayerStatus.Idle, () => connection.destroy());
    }
}