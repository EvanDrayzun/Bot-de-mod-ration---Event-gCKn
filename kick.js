const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    let kickedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );

    if (!kickedUser) {

     let kickidEmbed = new Discord.RichEmbed()
     .setTitle(`⛔__**ERREUR**__⛔`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
     .addField(`__L'utilisateur n'existe pas !__`, `__`)
     .addField(`╚═══════════════════════════════════════════════╝`, `__`)
     .setTimestamp();
    
     return message.channel.send(kickidEmbed);
    }

    const kickReason = args.slice(1).join(" ")

    if (!message.member.hasPermission("KICK_MEMBERS")) {

     let kickpermsEmbed = new Discord.RichEmbed()
     .setTitle(`⛔__**ERREUR**__⛔`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
     .addField(`__Vous n'avez pas les permissions pour faire cela !__`, `__`)
     .addField(`╚═══════════════════════════════════════════════╝`, `__`)
     .setTimestamp();

     return message.channel.send(kickpermsEmbed);
    }

    if (kickedUser.hasPermission("ADMINISTRATOR")) {
     let kickperms2Embed = new Discord.RichEmbed()
     .setTitle(`⛔__**ERREUR**__⛔`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
     .addField(`__Vous ne pouvez pas kick cette personne !__`, `__`)
     .addField(`╚═══════════════════════════════════════════════╝`, `__`)
     .setTimestamp();

     return message.channel.send(kickperms2Embed);
    }

    let kickEmbed = new Discord.RichEmbed()
    .setTitle(`🔨__**KICK**__🔨`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Utilisateur kick :__`, `<@${kickedUser.id}> (>ID: ${kickedUser.id})`)
    .addField(`__Utilisateur ayant kick :__`, `<@${message.author.id}> (>ID: ${message.author.id})`)
    .addField("__Salon :__", message.channel)
    .addField("__Raison :__", kickReason)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    let logskickEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__<@${message.author.id}> vient d'utiliser la commande Kick !__`, `__`)
    .addField(`__Utilisateur kick :__`, `<@${kickedUser.id}> (>ID: ${kickedUser.id})`)
    .addField(`__Utilisateur ayant kick :__`,`<@${message.author.id}> (>ID: ${message.author.id})`)
    .addField("__Salon :__", message.channel)
    .addField("__Raison :__", kickReason)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete();
    message.guild.member(kickedUser).kick(kickReason);
    message.channel.send(kickEmbed);
    logsChannel.send(logskickEmbed);
};

module.exports.help = {
    name: ("kick")
};