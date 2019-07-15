const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {

  if(message.author.id !== ops.corvoID) return;

  if (args[0] === "all") {
     try {
      delete require.cache[require.resolve('../main.js')];
      delete require.cache[require.resolve('./ban.js')];
      delete require.cache[require.resolve('./delete.js')];
      delete require.cache[require.resolve('./kick.js')];
      delete require.cache[require.resolve('./mute.js')];
      delete require.cache[require.resolve('./prefix.js')];
      delete require.cache[require.resolve('./reload.js')];
      delete require.cache[require.resolve('./report.js')];
      delete require.cache[require.resolve('./tempmute.js')];
      delete require.cache[require.resolve('./test.js')];
      delete require.cache[require.resolve('./unmute.js')];
    } catch (e) {
      return message.channel.send('Cannot reload all the files');
    }

    message.channel.send('Succesfully reloaded all files');
  }

  if (args[0] === "main") {
    try {
      delete require.cache[require.resolve('../main.js')];
    } catch (e) {
      return message.channel.send('Cannot reload main.js');
    }

    message.channel.send('Succesfully reloaded main.js');
  } else {

  try {
    if(args[0] === "all") return;

    delete require.cache[require.resolve(`./${args[0]}`)];
  } catch (e) {
    return message.channel.send(`Cannot reload command ${args[0]}`);
  }

  message.channel.send(`Succesfully reloaded command ${args[0]}`);
}

const modembed = new Discord.RichEmbed()
.setColor(0x1259cc)
.setAuthor(`${message.guild.name} Logs`, message.guild.iconURL)
.addField("Command:", "Reload")
.addField("File:", `${args[0]}.js`)
.addField("Moderator:", message.author.username)
.setTimestamp()

let sendEmbed = message.guild.channels.find(c => c.name === "logs")
sendEmbed.send(modembed)

}
