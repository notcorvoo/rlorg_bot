Discord = require("discord.js");

exports.run = async (client, message, args, ops) => {

  if(message.author.id !== ops.corvoID) return;

  let muted = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!muted) return message.channel.send("Please specify a user to be unmuted.");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason specified"

  let muterole = message.guild.roles.find(r => r.name === "Muted")

  muted.removeRole(muterole.id).then(() => {
    message.delete()
    muted.send(`You've been unmuted in Corvo's Rabbit Hole for: ${reason}`)
    message.channel.send(`${muted.user.username} is unmuted`)
  })

  let modlog = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Command:", "Unmute")
  .addField("Muted:", muted.user.username)
  .addField("Reason:", reason)
  .addField("Moderator:", message.author.username)
  .setTimestamp()

  let sendEmbed = message.guild.channels.find(c => c.name === "logs")
  sendEmbed.send(modlog)

}
