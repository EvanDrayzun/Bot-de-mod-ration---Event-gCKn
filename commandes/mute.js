const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {
  const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

  let muteUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  let muteuserEmbed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous devez mentionner un utilisateur sur le serveur !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();
  

  if (!muteUser) return message.channel.send(muteuserEmbed);

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {

  let mutepermsEmbed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous n'avez pas les permissions !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

    return message.channel.send(mutepermsEmbed);
  };

  if (muteUser.hasPermission("MANAGE_MESSAGES")) {

  let muteperms2Embed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous ne pouvez pas mute cette personne !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

    return message.channel.send(muteperms2Embed);
  };

  let muteRole = message.guild.roles.find(c => c.id == '615370387085328392');

  if (!muteRole) {
    try {
      muteRole = await message.guild.createRole({
        name: "mute",
        color: "#000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack)
    }
  };

  let muteTime = args[1];

  let mutetimeerrEmbed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous devez spécifier une durée valide (s/m/h) !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

  if (!muteTime) return message.channel.send(mutetimeerrEmbed);

  setTimeout(() => {

    let unmuteEmbed = new Discord.RichEmbed()
  .setTitle(`🔇__**MUTE**__🔇`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__<@${muteUser.id}> n'est plus mute ! Il a été mute par <@${message.author.id}> pendant ${ms(ms(muteTime))} !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

  let logsdemuteEmbed = new Discord.RichEmbed()
  .setTitle(`__**🎆LOGS🎆**__`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`<@${muteUser.id}> vient d'être unmute !`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();
  
  muteUser.removeRole(muteRole.id);
  message.channel.send(unmuteEmbed);
  logsChannel.send(logsdemuteEmbed);
  }, ms(muteTime))

  await muteUser.addRole(muteRole.id) 

  let muteEmbed = new Discord.RichEmbed()
  .setTitle(`🔇__**MUTE**__🔇`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`<@${muteUser.id}> à été mute par <@${message.author.id}> pendant ${ms(ms(muteTime))} !`, `__A bientôt !__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

  let logsmuteEmbed = new Discord.RichEmbed()
  .setTitle(`__**🎆LOGS🎆**__`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__<@${message.author.id}> vient d'utiliser la commande Mute !__`, `__`)
  .addField(`__<@${muteUser.id}> a été mute par <@${message.author.id}> pendant ${ms(ms(muteTime))} !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

  message.delete()
  message.channel.send(muteEmbed);
  logsChannel.send(logsmuteEmbed);
};

module.exports.help = {
  name: "mute"
};