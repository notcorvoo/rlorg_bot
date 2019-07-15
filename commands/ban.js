const Discord = require("discord.js");

exports.run = async (client, message, args, ops) => {

  if(message.author.id !== ops.corvoID) return;

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Cannot find specified user.");
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason specified"
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cannot kick a moderator.")

  let bEmbed = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Command:", "Ban")
  .addField("User Banned", `${bUser} ID: ${bUser.id}`)
  .addField("Moderator", `${message.author.username}`)
  .addField("Reason", reason)
  .setTimestamp()

  let bChannel = message.guild.channels.find(ch => ch.name === "logs");
  if(!bChannel) return message.channel.send("Cannot find log channel, please contact staff.");

  await bUser.send(`Hello, you've been kicked in What a Save! for: ${reason}`);
  bChannel.send(bEmbed);
  message.guild.member(bUser).ban(reason);

}
