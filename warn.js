const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync("./warn.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    let warnpermsEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Vous n'avez pas les permissions !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(warnpermsEmbed);

    let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0])

    let warnperms2Embed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Vous ne pouvez pas warn cette personne !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(warnUser.hasPermissions("ADMINISTRATOR")) return message.channel.send(warnperms2Embed);

    let warnargsEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Veuillez mentioner un utilisateur valide !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if(!warnUser) return message.reply(warnargsEmbed);

    const raison = args.slice(1).join(" ")

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warn.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnUserAvatar = warnUser.AvatarURL;

    let warnEmbed = new Discord.RichEmbed()
    .setTitle(`📜__**WARN**__📜`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setThumbnail(warnUserAvatar)
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Utilisateur warn :__`, `<@${warnUser.id}>`)
    .addField(`__Modérateur qui a warn :__`, `<@${message.author.id}>`)
    .addField(`__Salon :__`, message.channel)
    .addField(`__Nombres de warns :__`, warns[warnUser.id].warns)
    .addField(`__Raison :__`, raison)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    let logswarnEmbed = new Discord.RichEmbed()
        .setTitle(`__**🎆LOGS🎆**__`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
        .addField(`<@${message.author.id}> vient de warn <@${warnUser.id}> !`, `__`)
        .addField(`__Utilisateur warn :__`, `<@${warnUser.id}>`)
        .addField(`__Modérateur qui a warn :__`, `<@${message.author.id}>`)
        .addField(`__Salon :__`, message.channel)
        .addField(`__Nombres de warns :__`, warns[warnUser.id].warns)
        .addField(`__Raison :__`, raison)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

    message.channel.send(warnEmbed);
    logsChannel.send(logswarnEmbed)

    if(warns[warnUser.id].warns == 2) {
     let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0])

     let muterole = message.guild.roles.find(`id`, "615370387085328392");

       
     let warnmutedelEmbed = new Discord.RichEmbed()
     .setTitle(`⛔__**ERREUR**__⛔`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
     .addField(`__Le rôle "mute" n'existe pas :/__`, `__`)
     .addField(`╚═══════════════════════════════════════════════╝`, `__`)
     .setTimestamp();
    
     if(!muterole) return message.reply(warnmutedelEmbed);

     let mutetime = "120m";
     await(warnUser.addRole(muterole.id));

     let warn2Embed = new Discord.RichEmbed()
     .setTitle(`📜__**WARN**__📜`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
     .addField(`__<@${warnUser.id}>, tu as reçu un deuxième warn tu as été mute pour 2h__ !`, `__`)
     .addField(`╚═══════════════════════════════════════════════╝`, `__`)
     .setFooter(`Plus qu'un warn avant d'être ban !`)
     .setTimestamp();

     let logswarn2Embed = new Discord.RichEmbed()
     .setTitle(`__**🎆LOGS🎆**__`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
     .addField(`__<@${warnUser.id}> vient de se prendre un 2ème warn par <@${message.author.id}> !__`, `**Il est donc mute pendant 2h !**`)
     .addField(`__Utilisateur warn :__`, `<@${warnUser.id}>`)
     .addField(`__Modérateur qui a warn :__`, `<@${message.author.id}>`)
     .addField(`__Salon :__`, message.channel)
     .addField(`__Nombres de warns :__`, warns[warnUser.id].warns)
     .addField(`__Raison :__`, raison)
     .addField(`╚═══════════════════════════════════════════════╝` `__`)
     .setTimestamp();

     message.delete();
     message.channel.send(warn2Embed);
     logsChannel.send(logswarn2Embed);
    

     setTimeout(function() {
         let warnunmuteEmbed = new Discord.RichEmbed()
         .setTitle(`📜__**WARN**__📜`)
         .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
         .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
         .addField(`__<@${warnUser.id}>, tu as été démute__ !`, `__`)
         .addField(`╚═══════════════════════════════════════════════╝`, `__`)
         .setTimestamp();

         let logswarndemuteEmbed = new Discord.RichEmbed()
         .setTitle(`__**🎆LOGS🎆**__`)
         .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
         .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
         .addField(`__<@${warnUser.id}> vient d'être démute ! Il a été mute a cause d'un nombre trop important de warns !__`, `__`)
         .addField(`╚═══════════════════════════════════════════════╝` `__`)
         .setTimestamp();

         warnUser.removeRole(muterole.id)
         message.reply(warnunmuteEmbed);
         logsChannel.send(logswarndemuteEmbed);
        }, ms(mutetime))
    }

    if(warns[warnUser.id].warns == 3) {
        let warnUser = message.guild.member(message.mentions.users.first()) || message.guild.member.get(args[0])

        message.guild.member(warnUser).ban(raison)

        let warnbanEmbed = new Discord.RichEmbed()
        .setTitle(`📜__**WARN**__📜`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
        .addField(`__<@${warnUser.id}> à été ban car il à eu trop de warns !__`, `__`)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

        let warnban2Embed = new Discord.RichEmbed()
        .setTitle(`📜__**WARN**__📜`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
        .addField(`__Tu as été banni du serveur ${message.guild.name} à cause d'un nombre d'avertissements trop élevé !__ !`, `__`)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

        let logswarnbanEmbed = new Discord.RichEmbed()
        .setTitle(`__**🎆LOGS🎆**__`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
        .addField(`__${warnUser.username} a été ban a cause d'un nombre trop important de warns !__`, `__`)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

        message.channel.send(warnbanEmbed);
        warnUser.send(warnban2Embed);
        logsChannel.send(logswarnbanEmbed);
     }

};

module.exports.help = {
    name: "warn"
};