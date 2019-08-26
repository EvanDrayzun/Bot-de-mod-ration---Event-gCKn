const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    const warns = JSON.parse(fs.readFileSync("./warn.json", "utf8"));

    let casierpermsEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Vous n'avez pas les permissions !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(casierpermsEmbed);

    let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

    let casierargsEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Veuillez mentioner un utilisateur valide !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.channel.send(`Si aucun message ne s'affiche, c'est que <@${warnUser.id}> n'a pas de warn`)

    if(!warnUser) return message.channel.send(casierargsEmbed);

    let warnlevel = warns[warnUser.id].warns;

    let casierEmbed = new Discord.RichEmbed()
    .setTitle(`🗃️__**CASIER**__🗃️`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__<@${warnUser.id}> à actuellement ${warnlevel} warns !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    let logscasierEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__<@${message.author.id}> vient d'utiliser la commande Casier ! <@${warnUser.id}> a actuellement ${warnlevel} warns !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete();
    message.channel.send(casierEmbed);
    logsChannel.send(logscasierEmbed);
};

module.exports.help = {
    name: "casier"
};