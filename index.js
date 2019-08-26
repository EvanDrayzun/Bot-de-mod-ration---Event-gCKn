const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({ disableEveryone: true });
const config = require('./config.json');
const warnBuffer = 4;
const maxBuffer = 8;
const authors = [];

var warned = 0;
var banned = 0;

bot.commands = new Discord.Collection();

fs.readdir('./commandes/', (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');
    if (jsFile.length <= 0) {
        console.log('Je ne trouve pas de commande !');
        return;
    }

    jsFile.forEach((f, i) => {
      let props = require(`./commandes/${f}`)
      bot.commands.set(props.help.name, props);
    })
});

bot.on('ready', async () => {
    console.log (`${bot.user.username} est en ligne et est actif avec ${bot.users.size} utilisateurs !`);
    bot.user.setActivity('.help :D', {type: 3})
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (prefix == command.slice(0, 1)) {
        let command = messageArray[0]; 
        let commandFile = bot.commands.get(command.slice(prefix.length));
        if (commandFile) commandFile.run(bot, message, args);
      };
});

bot.on("messageDelete", async message => {
    const logsChannel = bot.channels.get("614572753835786326");

    let logsdeleteEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__Le message suivant a été supprimé__`, `__`)
    .addField(`__Message :__`, message.content, true)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    logsChannel.send(logsdeleteEmbed)
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    bot.on("messageUpdate", async(oldMessage, newMessage) => {
        const logsChannel = bot.channels.get("614572753835786326");

        if(oldMessage.content === newMessage.content) {
            return;
        }

     let logsmodifEmbed = new Discord.RichEmbed()
     .setTitle(`Auteur de la modification : ${message.author.username}`)
     .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
     .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
     .addField(`__Message modifié :__`, `__`)
     .addField(`__Avant :__`, oldMessage.content, true)
     .addField(`__Après :__`, newMessage.content, true)
     .addField(`╚══════════════════════════════════════════════╝`, `__`)
     .setTimestamp();

     logsChannel.send(logsmodifEmbed)
    });
});

// Messages de bienvenue

bot.on('guildMemberAdd', member => {
    const logsChannel = bot.channels.get("614572753835786326");

    const channel = member.guild.channels.find(c => c.id == "614816703028658177");

    if (!channel) return;

    let role = member.guild.roles.find(`name`, 'Visiteur') 

    let memberIcon = member.user.avatarURL;

    let bienvmemberEmbed = new Discord.RichEmbed()
    .setTitle(`**__Bienvenue sur le serveur ${member.guild.name} !__**`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`**Merci à toi d'avoir rejoint notre serveur !**`, `__`)
    .setTimestamp();

    let bienvEmbed = new Discord.RichEmbed()
    .setTitle(`__Bienvenue sur le serveur ${member.guild.name} !__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setThumbnail(memberIcon)
    .addField(`Merci à ${member.user.tag} d'avoir rejoint notre serveur !`, `*Grâce à toi, nous sommes ${member.guild.memberCount}*`)
    .setTimestamp();

    let logsbienvEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__${member.user.username} viens de rejoindre le serveur !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();
    
    channel.send(bienvEmbed);
    member.send(bienvmemberEmbed);
    member.addRole(role);
    logsChannel.send(logsbienvEmbed);

    bot.channels.find(c => c.id == "614819491402088449").setName(`Membres: ${member.guild.memberCount}`);
    bot.channels.find(c => c.id == "614819594636623873").setName(`Nombres d'humains: ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.find(c => c.id == "614819631890432020").setName(`Nombres de robots: ${member.guild.members.filter(m => m.user.bot).size}`);

});

// Messages d'aurevoir

bot.on('guildMemberRemove', member => {
    const logsChannel = bot.channels.get("614572753835786326");

    const channeldep = member.guild.channels.find(c => c.id == "614816734154850304");

    let memberIcon = member.user.avatarURL;

    let depEmbed = new Discord.RichEmbed()
    .setTitle(`__${member.user.tag} est parti du serveur ${member.guild.name}__ !`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .setThumbnail(memberIcon)
    .addField(`Ne remerciez pas ${member.user.tag} d'être parti !`, `*A cause de toi, nous sommes plus que ${member.guild.memberCount}*`)
    .setTimestamp();

    let logsdepEmbed = new Discord.RichEmbed()
    .setTitle(`__**🎆LOGS🎆**__`)
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
    .addField(`__${member.user.username} viens de partir du serveur !__`, `__`)
    .addField(`╚═══════════════════════════════════════════════╝`, `__`)
    .setTimestamp();

    channeldep.send(depEmbed);
    logsChannel.send(logsdepEmbed);

    bot.channels.find(c => c.id == "614819491402088449").setName(`Membres: ${member.guild.memberCount}`);
    bot.channels.find(c => c.id == "614819594636623873").setName(`Nombres d'humains: ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.find(c => c.id == "614819631890432020").setName(`Nombres de robots: ${member.guild.members.filter(m => m.user.bot).size}`);
});


bot.on('message', message => {
    if (message.author.id != bot.user.id) {
        var now = Math.floor(Date.now());
        authors.push({
            "time": now,
            "author": message.author.id,
            "message": message.content
        });

        var matched = 0;

        const user = message.channel.guild.members.find(member => member.user.id === message.author.id);

        const antispam1Embed = new Discord.RichEmbed()
        .setTitle(`__**🎆LOGS🎆**__`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
        .addField(`__Ne fais pas le fou, arrête de spammer ou je vais m'occuper de toi ^^__`, `__`)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

        let antispam2Embed = new Discord.RichEmbed()
        .setTitle(`__**🎆LOGS🎆**__`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
        .addField(`__${message.author.username} a trop fait le fou, il a été banni pour spam ! Quelqu'un d'autre ?__`, `__`)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();

        for (var i = 0; i < authors.length; i++) {
            if (authors[i].time > now - 3000) {
                matched++;
                if (matched == warnBuffer && !warned) {
                    warned = true;
                    message.reply(antispam1Embed);
                }
                if (matched == maxBuffer) {
                    if (!banned) {
                        message.channel.send(antispam2Embed);
                        banned = true;
                    }

                    if (user) {
                        user.ban().then((member) => {
                            console.log("${user} a été ban par mes services d'anti-spam")
                        }).catch(() => {
                            console.log("Impossible à bannir !");
                        });
                    }
                }
            } else if (authors[i].time < now - 3000) {
                authors.splice(i);
                warned = false;
                banned = false;
            }
        }
    }
});

bot.login(config.token);