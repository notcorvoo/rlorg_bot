const Discord = require ('discord.js');

exports.run = async (client, message, args, ops) => {

  const embed = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name}`, message.guild.iconURL)
  .addField("Deleting:", 'Rewind Gaming, please wait 5 seconds')
  .setTimestamp()

  const fembed = new Discord.RichEmbed()
  .setColor(0x1259cc)
  .setAuthor(`${message.guild.name}`, message.guild.iconURL)
  .addField("I've deleted: ", 'Rewind Gaming')
  .setTimestamp()

  if (args[0] === "rewind") {
    await message.channel.send(embed).then(msg => msg.delete(5000));
    message.channel.send(fembed);
  }

}
