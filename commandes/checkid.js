const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
 const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

 try {
    const blacklist = JSON.parse(fs.readFileSync("blacklist.json", "utf8"));
    const user = args[0]

    let checkiderrEmbed = new Discord.RichEmbed()
    .setTitle(`⛔__**ERREUR**__⛔`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Veuillez mentioner la personne que vous voulez verifier !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    if (!user) return message.channel.send(checkiderrEmbed);
    bot.fetchUser(user).then(id => {
        const checkidEmbed = new Discord.RichEmbed()
        .setTitle('✅__**CHECK**__✅')
        .setColor('RANDOM')
        .addField('__Utilisateur :__', id.tag)
        .addField('__Identifiant :__', id.id)
        .addField('__Compte créé le :__', moment(id.createdAt).format('DD-MM-YYYY HH:mm:ss'))
        .addField('__Bot ? :__', id.bot)
        .setThumbnail(id.displayAvatarURL)
        .setTimestamp();

        if (blacklist[user] !== undefined) {
            checkidEmbed.addField('__Blacklist ? :__', 'Oui');
            checkidEmbed.addField('__Raison :__', blacklist[user].raison);
        } else {
            if (blacklist[user] === undefined) {
                checkidEmbed.addField('__Blacklist ?__:', 'Non');
            }
    }

    let logscheckidEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__<@${message.author.id}> vient d'utiliser la commande CheckID !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete()
    message.channel.send(checkidEmbed);
    logsChannel.send(logscheckidEmbed)
    });
    
} catch (e) {
    console.log(e);
    message.channel.send(`Erreur: \`${e.message}\``);
}
};

module.exports.help = {
    name: ("checkid")
};