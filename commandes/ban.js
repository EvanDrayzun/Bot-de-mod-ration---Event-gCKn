const Discord = require('discord.js');

const banidEmbed = new Discord.RichEmbed()
.setTitle(`⛔__**ERREUR**__⛔`)
.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
.addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
.addField(`__L'utilisateur n'existe pas !__`, `__`)
.addField(`╚═══════════════════════════════════════════════╝`, `__`)
.setTimestamp();

const banpermsEmbed = new Discord.RichEmbed()
.setTitle(`⛔__**ERREUR**__⛔`)
.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
.addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
.addField(`__Vous n'avez pas les permissions pour faire cela !__`, `__`)
.addField(`╚═══════════════════════════════════════════════╝`, `__`)
.setTimestamp();

module.exports.run = async (bot, message, args) => {

    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    const banReason = args.slice(1).join(" ")

    let bannedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
    );

    if (!bannedUser) return await message.channel.send(banidEmbed);

    if (!message.member.hasPermission("MANAGE_SERVER")) return await message.channel.send(banpermsEmbed);

    let banEmbed = new Discord.RichEmbed()
    .setTitle(`🔨__**BAN**__🔨`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`Utilisateur ban :`, `${bannedUser.username} (>ID: ${bannedUser.id})`)
    .addField(`Modérateur ayant ban :`,`${message.author.tag} (>ID: ${message.author.id})`)
    .addField("Salon :", message.channel)
    .addField("Raison :", banReason)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    let logsbanEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`${message.author.username} vient d'utiliser la commande Ban !`, `__`)
    .addField(`__Utilisateur ban :__`, `${bannedUser.username} (>ID: ${bannedUser.id})`)
    .addField(`__Modérateur ayant ban :__`,`${message.author.tag} (>ID: ${message.author.id})`)
    .addField("__Salon :__", message.channel)
    .addField("__Raison :__", banReason)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete();
    message.guild.member(bannedUser).ban(banReason);
    message.channel.send(banEmbed);
    logsChannel.send(logsbanEmbed);
};

module.exports.help = {
    name: ("ban")
};