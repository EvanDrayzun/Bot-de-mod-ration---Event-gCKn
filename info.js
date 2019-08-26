const Discord = require("discord.js");
const moment = require("moment"); 

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

    let botIcon = bot.user.displayAvatarURL;

    let embed = new Discord.RichEmbed()
    .setTitle('ℹ️--__**Informations sur le bot :**__--ℹ️')
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setThumbnail(botIcon)
    .addField('__Nom du bot__ :', bot.user.username)
    .addField('__Créateurs du bot__ :', '@! " d r a y z u n *. *#3855 // @Kordik#8516 // Squyletin6#8763')
    .addField('__Crée le__ :', moment(bot.user.createdAt).format('DD-MM-YYYY HH:mm:ss'))
    .setTimestamp();

    let logsinfoEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`__<@${message.author.id}> vient d'utiliser la commande Info !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete()
    message.channel.send(embed);
    logsChannel.send(logsinfoEmbed);
};

module.exports.help = {
    name: "info"
};