const Discord = require ("discord.js");

exports.run = async (client, message, args, ops) => {

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Could not find specified user.");
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason specified"

  let reportEmbed = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Command:", "Unmute")
  .addField("Reported user", `${rUser} ID: ${rUser.id}`)
  .addField("Reported by", `${message.author} ID: ${message.author.id}`)
  .addField("In channel: ", message.channel)
  .addField("Reason", reason);
  .setTimestamp()

  let sendChannel = message.guild.channels.find(ch => ch.name === "reports" );
  if(!sendChannel) return message.channel.send("There's no report channel, please contact staff.")

  message.delete();
  sendChannel.send(reportEmbed);

}
