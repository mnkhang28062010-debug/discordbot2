const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const TOKEN = "MTUyMTE0MDcyMzkzNDU2MDM2Nw.GA-mxs.q7NbVzChHGbK_ylkHVerr6fMCqqP1ncZ4eGkAg";
const GUILD_ID = "1461352606021452022";
const VOICE_CHANNEL_ID = "1521192322899902637";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", async () => {
  console.log(`✅ ${client.user.tag} đã online!`);

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

    if (!channel || channel.type !== 2) {
      console.log("❌ Voice Channel ID không đúng.");
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    console.log("🎧 Bot đã vào voice.");
  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);
