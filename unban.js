const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
 const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");

 const reason = args.slice(1).join(" ")

 const unbannedMember = await bot.fetchUser(args[0])

 const unbanEmbed = new Discord.RichEmbed()
 .setTitle(`🔨__**UNBAN**__🔨`)
 .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
 .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
 .addField(`__${unbannedMember.username} a bien été unban !__`, `>ID : ${unbannedMember.id}`)
 .addField(`Modérateur ayant unban :`, message.author.username)
 .addField(`Salon :`, message.channel)
 .addField(`Raison :`, reason)
 .addField(`╚═══════════════════════════════════════════════╝`, `__`)
 .setTimestamp();

 const logsunbanEmbed = new Discord.RichEmbed()
 .setTitle(`🎆__**LOGS**__🎆`)
 .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
 .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
 .addField(`__${unbannedMember.username} a bien été unban !__`, `>ID : ${unbannedMember.id}`)
 .addField(`__Modérateur ayant unban :__`, message.author.username)
 .addField(`__Salon :__`, message.channel)
 .addField(`__Raison :__`, reason)
 .addField(`╚═══════════════════════════════════════════════╝`, `__`)
 .setTimestamp();

 let unbanpermsEmbed = new Discord.RichEmbed()
 .setTitle(`⛔__**ERREUR**__⛔`)
 .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
 .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
 .addField(`__Vous n'avez pas les permissions pour faire cette commande !__`, `__`)
 .addField(`╚═══════════════════════════════════════════════╝`, `__`)
 .setTimestamp();

 if(!message.member.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(unbanpermsEmbed);

 let unbanargsEmbed = new Discord.RichEmbed()
 .setTitle(`⛔__**ERREUR**__⛔`)
 .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
 .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
 .addField(`__Veuillez spécifier l'id de la personne que vous voulez unban !__`, `__`)
 .addField(`╚═══════════════════════════════════════════════╝`, `__`)
 .setTimestamp();

 if(!unbannedMember) return message.channel.send(unbanargsEmbed);

 if(!reason) reason = "Aucune raison n'a été donnée"

 let unbanperms2Embed = new Discord.RichEmbed()
 .setTitle(`⛔__**ERREUR**__⛔`)
 .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
 .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
 .addField(`__Je n'ai pas les permissions pour faire cela !__`, `__`)
 .addField(`╚═══════════════════════════════════════════════╝`, `__`)
 .setTimestamp();

 if(!message.guild.me.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(unbanperms2Embed);

 try {
    message.guild.unban(unbannedMember, {reason: reason})
    message.delete()
    message.channel.send(unbanEmbed);
    logsChannel.send(logsunbanEmbed);
 } catch(e) {
     console.log(e.message)
 }

};

module.exports.help = {
    name: ("unban")
};