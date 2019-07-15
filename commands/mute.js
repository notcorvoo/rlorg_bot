const Discord = require("discord.js");

exports.run = async (client, message, args, ops) => {

  if(message.author.id !== ops.corvoID) return;

  let muted = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!muted) return message.channel.send("Please specify a user to be muted.");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason specified"

  let muterole = message.guild.roles.find(r => r.name === "Muted")
  if(!muterole) {
    console.log('Command: mute Error: Muterole does not exist in server!');
    message.channel.send("***ERROR*** Check logs.");
  }

  muted.addRole(muterole.id).then(() => {
    message.delete()
    muted.send(`Hello, you\'ve been muted in rlorg! for: ${reason}`)
    message.channel.send(`${muted.user.username} is muted`)
  })

  let modlog = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Command:", "Mute")
  .addField("Muted:", muted.user.username)
  .addField("Duration:", "Permanent")
  .addField("Reason:", reason)
  .addField("Moderator:", message.author.username)
  .setTimestamp()

  let sendEmbed = message.guild.channels.find(c => c.name === "logs")
  sendEmbed.send(modlog)

}
