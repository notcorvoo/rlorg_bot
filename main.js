const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
const enmap = require('enmap');
const map = new enmap();

let corvoID = '338393075191906304';
const config = require('./config.json');


client.on('message', async message => {
  let guild = client.guilds.get('600273244980772878');

  var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));
  var prefix = prefixes[guild.id].prefixes;


  if (message.author.bot) return;
  let logchannel = guild.channels.find(ch => ch.name === "logs");

  if (message.channel.type !== 'text') {

    let active = await db.fetch(`support_${message.author.id}`);

    let guild = client.guilds.get('600273244980772878');

    let channel, found = true;

    try{
      if (active) client.channels.get(active.channelID).guild;
    } catch (e) {
      found = false;
    }

    if (!active || !found) {

      active = {};

      let staff = guild.roles.find(r => r.name === "Staff")
      let everyone = guild.roles.find(r => r.name === "@everyone")

      let channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}-support`, 'text')
      channel.setParent('600364383213846566')
      channel.overwritePermissions(staff, {
        VIEW_CHANNEL: true
      });
      channel.overwritePermissions(everyone, {
        VIEW_CHANNEL: false
      });

      let author = message.author;

      const newChannel = new Discord.RichEmbed()
      .setColor(0x1259cc)
      .setAuthor(author.tag, author.displayAvatarURL)
      .setFooter('Support Ticket Created')
      .addField('User', author)
      .addField('ID', author.id)

      await channel.send(newChannel);

      const newTicket = new Discord.RichEmbed()
      .setColor(0x1259cc)
      .setAuthor(`Hello, ${author.tag}`, author.displayAvatarURL)
      .setFooter('Support Ticket Created')

      const creaE = new Discord.RichEmbed()
      .setColor(0x1259cc)
      .setAuthor(`Ticket was created in ${guild.name}`, guild.iconURL)
      .addField("Creator:", author.tag)
      .addField("Information:", message.content)
      .setTimestamp()


      await author.send(newTicket);

      await logchannel.send(creaE);

      active.channelID = channel.id;
      active.targetID = author.id;

    }

    channel = client.channels.get(active.channelID);

    const dm = new Discord.RichEmbed()
    .setColor(0x1259cc)
    .setAuthor(`Thank you, ${message.author.id}`, message.author.displayAvatarURL)
    .setFooter(`Your message has been sent -- A staff member will be in contact soon`)

    await message.author.send(dm);

    const embed = new Discord.RichEmbed()
    .setColor(0x1259cc)
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription(message.content)
    .setFooter(`Message recieved -- ${message.author.tag}`)
    .setTimestamp()

    await channel.send(embed);

    db.set(`support_${message.author.id}`, active);
    db.set(`supportChannel_${channel.id}`, message.author.id);
    return;

  }

  // support chan messages
  let support = await db.fetch(`supportChannel_${message.channel.id}`);

  if(support) {

    support = await db.fetch(`support_${support}`);

    let supportUser = client.users.get(support.targetID);
    if (!supportUser) return message.channel.delete()

//close cmd
    if (message.content.toLowerCase() === `${prefix}close`) {

      let guild = client.guilds.get('600273244980772878');

      const finish = new Discord.RichEmbed()
      .setColor(0x1259cc)
      .setAuthor(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL)
      .setFooter("Ticket Closed -- Corvo's Rabit Hole")
      .setDescription('Your ticket has been **completed** || If you wish to reopen this, or create a new ticket, please send a message to the bot.')

      const finE = new Discord.RichEmbed()
      .setColor(0x1259cc)
      .setAuthor(`Ticket was closed in ${guild.name}`, guild.iconURL)
      .addField("Creator:", supportUser.tag)
      .addField("Moderator:", message.author.username)
      .setTimestamp()

      supportUser.send(finish);
      logchannel.send(finE);

      message.channel.delete();

      db.delete(`support_${support.targetID}`);

    }

    if (message.content === `${prefix}close`) return;
    const embed = new Discord.RichEmbed()
      .setColor(0x1259cc)
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setFooter(`Message recieved -- Corvo's Rabbit Hole`)
      .setDescription(message.content)

    client.users.get(support.targetID).send(embed)

    message.delete({timeout: 1000});

    embed.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);

    return message.channel.send(embed);

  }

  var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));



  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

    var prefix = prefixes[message.guild.id].prefixes;


  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();


  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {

    let ops = {
      corvoID: corvoID,
      prefix: prefix
    }

    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);
  } catch(e) {
    console.log(e.stack)
  };


});


//logging edited messages
client.on("messageUpdate", async(oldMessage, newMessage) =>{
  if(oldMessage.content === newMessage.content) return;

  let editEmbed = new Discord.RichEmbed()
  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL)
  .setColor(0x1259cc)
  .setDescription("A message was edited")
  .addField("Before", oldMessage.content, true)
  .addField("After", newMessage.content, true)
  .setTimestamp()

  let logChannel = newMessage.guild.channels.find(ch => ch.name === "logs")
  if(!logChannel) return;

  logChannel.send(editEmbed);

})

//logging deleted messages
client.on("messageDelete", async(message) =>{
  var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

  var prefix = prefixes[message.guild.id].prefixes;

  if (message.channel.id === "598505040067559428") return;
  if (message.channel.parent === "598163692881707008") return;
  if (message.content.startsWith(prefix)) return;

  if (message.author.bot) return;

    let delEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x1259cc)
    .setDescription("A message was deleted")
    .addField("Deleted", message.content, true)
    .setTimestamp()

    let logChannel2 = message.guild.channels.find(ch => ch.name === "logs")
    if(!logChannel2) return;

    logChannel2.send(delEmbed);

})

client.on('ready', () => console.log('Succesfully started up.'));

client.login(config.token);
