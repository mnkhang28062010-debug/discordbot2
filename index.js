const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Web server started");
});

const TOKENS = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3,
  process.env.TOKEN4,
  process.env.TOKEN5,
];

TOKENS.forEach((token, index) => {
  if (!token) return;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  client.once("clientReady", async () => {
    console.log(`Bot ${index + 1}: ${client.user.tag} online`);

    try {
      const guild = await client.guilds.fetch(process.env.GUILD_ID);

      joinVoiceChannel({
        channelId: process.env.VOICE_ID,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
      });

      console.log(`Bot ${index + 1} joined voice`);
    } catch (err) {
      console.error(`Bot ${index + 1} failed to join voice:`, err);
    }
  });

  client.login(token).catch(console.error);
});

client.login(process.env.TOKEN);
