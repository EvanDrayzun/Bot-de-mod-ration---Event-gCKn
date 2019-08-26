const Discord = require('discord.js');
const fs = require('fs');
let warns = JSON.parse(fs.readFileSync("./warn.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    let unwarnpermsEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Vous n'avez pas les permissions !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(unwarnpermsEmbed);

    let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0])

    let unwarnperms2Embed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Vous ne pouvez pas unwarn cette personne !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(warnUser.hasPermissions("ADMINISTRATOR")) return message.channel.send(unwarnperms2Embed);

    let unwarnargsEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Veuillez mentioner un utilisateur valide !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(!warnUser) return message.channel.send(unwarnargsEmbed);

    const raison = args.slice(1).join(" ")

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns--;

    fs.writeFile("./warn.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let unwarnEmbed = new Discord.RichEmbed()
    .setTitle(`📜__**WARN**__📜`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Utilisateur unwarn :__`, `<@${warnUser.id}>`)
    .addField(`__Modérateur qui a unwarn :__`, `<@${message.author.id}>`)
    .addField(`__Salon :__`, message.channel)
    .addField(`__Nombres de warns :__`, warns[warnUser.id].warns)
    .addField(`__Raison :__`, raison)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    let logsunwarnEmbed = new Discord.RichEmbed()
        .setTitle(`__**🎆LOGS🎆**__`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
        .addField(`<@${message.author.id}> vient de unwarn <@${warnUser.id}> !`, `__`)
        .addField(`__Utilisateur unwarn :__`, `<@${warnUser.id}>`)
        .addField(`__Modérateur qui a unwarn :__`, `<@${message.author.id}>`)
        .addField(`__Salon :__`, message.channel)
        .addField(`__Nombres de warns :__`, warns[warnUser.id].warns)
        .addField(`__Raison :__`, raison)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

    message.channel.send(unwarnEmbed);
    logsChannel.send(logsunwarnEmbed)

};

module.exports.help = {
    name: "unwarn"
};