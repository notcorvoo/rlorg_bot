const Discord = require("discord.js");

exports.run = async (client, message, args, ops) => {

  if(message.author.id !== ops.corvoID) return;

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Cannot find specified user.");
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason specified"
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cannot kick a moderator.")

  let kEmbed = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
  .addField("Command:", "Kick")
  .addField("User Kicked", `${kUser} ID: ${kUser.id}`)
  .addField("Moderator", `${message.author.username}`)
  .addField("Reason", reason)
  .setTimestamp()

  let kChannel = message.guild.channels.find(ch => ch.name === "logs");
  if(!kChannel) return message.channel.send("Cannot find log channel, please contact staff.");

  await kUser.send(`Hello, you've been kicked in What a Save! for: ${reason}`);
  kChannel.send(kEmbed);
  message.guild.member(kUser).kick();

}
