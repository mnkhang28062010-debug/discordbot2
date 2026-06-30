require("dotenv").config();

const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
    console.log(`Đăng nhập thành công: ${client.user.tag}`);

    try {
        const guild = await client.guilds.fetch("1461352606021452022");
        const channel = await guild.channels.fetch("1521192322899902637");

        if (!channel || channel.type !== ChannelType.GuildVoice) {
            return console.log("Không tìm thấy kênh voice.");
        }

        joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
           
