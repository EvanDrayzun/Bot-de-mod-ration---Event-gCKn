const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    let servIcon = message.guild.iconURL;

    let servEmbed = new Discord.RichEmbed()
    .setTitle('ℹ️__**Informations sur le serveur :**__ℹ️')
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setThumbnail(servIcon)
    .addField('__Nom du serveur :__', message.guild.name)
    .addField('__Nombre total de membres :__', message.guild.memberCount)
    .addField('__Crée le :__', moment(message.guild.createdAt).format('DD-MM-YYYY HH:mm:ss'))
    .addField('__Vous avez rejoins le :__', moment(message.member.joinedAt).format('DD-MM-YYYY HH:mm:ss'))
    .addField(`__Créateur :__`, message.guild.owner)
    .addField(`__Région :__`, message.guild.region)
    .setTimestamp();
       
    let logsinfoservEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__<@${message.author.id}> vient d'utiliser la commande Infoserv !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete()
    message.channel.send(servEmbed);
    logsChannel.send(logsinfoservEmbed);
};
    
module.exports.help = {
    name: "infoserv"
};