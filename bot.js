const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive");
});

if (!global.started) {
  global.started = true;
  app.listen(process.env.PORT || 3000, () => {
    console.log("Web server started");
  });
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("clientReady", async () => {
  console.log(`Bot ${process.env.BOT_NUMBER}: ${client.user.tag} online`);

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);

    const connection = joinVoiceChannel({
      channelId: process.env.VOICE_ID,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 30000);

    console.log(
      `Bot ${process.env.BOT_NUMBER}: Connected to voice successfully`
    );
  } catch (err) {
    console.error(
      `Bot ${process.env.BOT_NUMBER}: Failed to connect`,
      err
    );
  }
});

client.login(process.env.TOKEN);
