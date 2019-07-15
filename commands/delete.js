const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {

  if(message.author.id !== ops.corvoID) return;

  if (args[0] >= "101") return message.channel.send("Please specify a valid number under or equal to 100").then(msg => msg.delete(3000));


  if (isNaN(args[0])) {
    message.channel.send("Please specify a valid number. \n *;delete <amount>*").then(msg => msg.delete(3000));
  }

  async function clear() {
    await message.delete()

    const fetched = await message.channel.fetchMessages({limit: args[0]});

  await message.channel.bulkDelete(fetched)
      .catch(error => console.log(`${error}`));
  message.channel.send(`I've deleted **${fetched.size}** messages.`).then(msg => msg.delete(3000));

  }

clear();

}
