const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

  let unmuteUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  let unmuteuserEmbed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous devez mentionner un utilisateur sur le serveur !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();
  

  if (!unmuteUser) return message.channel.send(unmuteuserEmbed);

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {

  let unmutepermsEmbed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous n'avez pas les permissions !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

    return message.channel.send(unmutepermsEmbed);
  };

  if (unmuteUser.hasPermission("MANAGE_MESSAGES")) {

  let unmuteperms2Embed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__Vous ne pouvez pas mute cette personne !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

    return message.channel.send(unmuteperms2Embed);
  };

  let muteRole = message.guild.roles.find(c => c.name == 'mute');

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

  let unmuteEmbed = new Discord.RichEmbed()
  .setTitle(`🔇__**MUTE**__🔇`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`<@${unmuteUser.id}> à été unmute par <@${message.author.id}> !`, `__A bientôt !__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

  let logsunmuteEmbed = new Discord.RichEmbed()
  .setTitle(`__**🎆LOGS🎆**__`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
  .addField(`__<@${message.author.id}> vient d'utiliser la commande Unmute !__`, `__`)
  .addField(`__<@${unmuteUser.id}> a été unmute par <@${message.author.id}> !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();

  
  unmuteUser.removeRole(muteRole.id);
  message.delete()
  message.channel.send(unmuteEmbed);
  logsChannel.send(logsunmuteEmbed);
};

module.exports.help = {
  name: "unmute"
};