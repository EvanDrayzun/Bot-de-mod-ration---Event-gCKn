const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");
    
    let helpEmbed = new Discord.RichEmbed()
    .setTitle('__**Liste de commandes du bot :**__')
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`🚫__**ADMINISTRAION**__🚫`, `__`)
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`.kick`, `Sert à exclure un utilisateur du serveur (.kick @user#0001 raison)`)
    .addField(`.ban`, `Sert à bannir un utilisateur du serveur (.ban @user#0001 raison)`)
    .addField(`.unban`, `Sert a unban un utilisateur par l'id (.unban id raison)`)
    .addField(`.mute`, `Sert à mute __temporairement__ un utilisateur (.mute @user#0001 raison 30s/1m etc..)`)
    .addField(`.warn`, `Sert à avertir un utilisateur (2 warns = mute 2h // 3 warn = ban // .warn @user#0001 raison)`)
    .addField(`.casier`, `Sert à afficher le casier d'un utilisateur (nombres de warns)`)
    .addField(`.blacklist`, `Sert a ajouter a la blacklist un utilisateur par l'id (.blacklist id raison)`)
    .addField(`.checkid`, `Sert à avoir toutes les informations sur un utilisateur (.checkid id)`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .addField(`🔼__**INFORMATIONS**__🔽`, `__`)
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`.info`, `Affiche des informations sur le bot`)
    .addField(`.infoserv`, `Affiche des informations sur le serveur`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)

    let logshelpEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`${message.author.username} vient d'utiliser la commande Help !`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();
     
    let helpmpEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪۞⟫◗▹═══════════════════╗`, `__`)
    .addField(`${message.author.username}, veuillez regarder vos messages privés ✉️!`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    message.delete()
    message.author.send(helpEmbed)
    logsChannel.send(logshelpEmbed);
    message.channel.send(helpmpEmbed); 
};

module.exports.help = {
    name: "help"
};