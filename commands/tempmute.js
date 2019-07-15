const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args, ops) => {



  if(message.author.id !== ops.corvoID) return;

  let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send("Please specify a user to be muted.");
  if(tomute.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || message.guild.owner) return message.channel.send("Cannot mute a moderator.");

  let sendEmbed = message.guild.channels.find(c => c.name === "logs")

  let reason = args.slice(2).join(" ");
  if(!reason) reason = "No reason specified"

  let muterole = message.guild.roles.find(r => r.name === "Muted")
  if(!muterole) {
    console.log('Command: mute Error: Muterole does not exist in server: What a Save!');
    message.channel.send("***ERROR*** Check logs.");
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("Please specify a time.");

    message.delete()

  // Embeds

  let logmute = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Command:", "Tempmute")
  .addField("Muted:", tomute.user.username)
  .addField("Duration:", `${ms(ms(mutetime))}`)
  .addField("Reason:", reason)
  .addField("Moderator:", message.author.username)
  .setTimestamp()

  let logunmute = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Event:", "Unmute")
  .addField("Unmuted:", tomute.user.username)
  .addField("Moderator:", message.author.username)
  .setTimestamp()

  tomute.addRole(muterole.id).then(() => {
    sendEmbed.send(logmute)
    tomute.send(`Hello, you've been muted in What a Save! for: ${reason} Duration: ${ms(ms(mutetime))}`);
    message.channel.send(`User: ${tomute.user.username} has been muted for ${ms(ms(mutetime))}`);

  })

  setTimeout(function() {
    tomute.removeRole(muterole.id)
    tomute.send(`You've been unmuted in bot test server! Behave, punk`);
    sendEmbed.send(logunmute)
  }, ms(mutetime));



}
