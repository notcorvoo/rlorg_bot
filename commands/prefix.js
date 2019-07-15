const Discord = require("discord.js");

const fs = require('fs');

exports.run = (client, message, args, ops, prefix) => {

  if(message.author.id !== ops.corvoID) return;

  if(!args[0]) return message.channel.send(`Please specify a valid prefix. \n${ops.prefix}prefix <valid prefix>`);


  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  message.channel.send(`Prefix has been set to \`${args[0]}\`!`)

    let modembed = new Discord.RichEmbed()
    .setColor(0x1259cc)
    .setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
    .addField("Command:", "Prefix")
    .addField("Set to:", args[0])
    .addField("Moderator:", message.author.username)
    .setTimestamp()

    let sendEmbed = message.guild.channels.find(c => c.name === "logs")
    sendEmbed.send(modembed)

}
