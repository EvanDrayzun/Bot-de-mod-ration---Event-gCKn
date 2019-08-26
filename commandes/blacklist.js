const Discord = require('discord.js');
const fs = require('fs');

const blacklisterrEmbed = new Discord.RichEmbed()
.setTitle(`⛔__**ERREUR**__⛔`)
.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
.addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
.addField(`__La personne que vous essayez de blacklist est déjà blacklist !__`, `__`)
.addField(`╚═══════════════════════════════════════════════╝`, `__`)
.setTimestamp();

module.exports.run = async (bot, message, args) => {
  const logsChannel = message.guild.channels.find(c => c.id == "614572753835786326");
  const userToAdd = args[0];
  
  const blacklistaddEmbed = new Discord.RichEmbed()
  .setTitle(`⛔__**ERREUR**__⛔`)
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
  .addField(`__<@${userToAdd.id}> a été ajouté a la blacklist avec succès !__`, `__`)
  .addField(`╚═══════════════════════════════════════════════╝`, `__`)
  .setTimestamp();
  
  try {
    let blacklist = JSON.parse(fs.readFileSync("blacklist.json", "utf8"));
    
    if (!userToAdd) {
      let blacklistargsEmbed = new Discord.RichEmbed()
      .setTitle(`⛔__**ERREUR**__⛔`)
      .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
      .addField(`__Veuillez envoyer l'id d'un utilisateur valide !__`, `__`)
      .addField(`╚═══════════════════════════════════════════════╝`, `__`)
      .setTimestamp();
      
      message.channel.send(blacklistargsEmbed);
    } else {
      if (blacklist[userToAdd] !== undefined)
      return message.channel.send(blacklisterrEmbed);
      
      var reason = message.content.substring(26, message.length);
      
      if (!reason) {
        let blacklistreasonEmbed = new Discord.RichEmbed()
        .setTitle(`⛔__**ERREUR**__⛔`)
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
        .addField(`__Veuillez spécifier une raison pour ajouter cette personne à la blacklist !__`, `__`)
        .addField(`╚═══════════════════════════════════════════════╝`, `__`)
        .setTimestamp();
        
        message.channel.send(blacklistreasonEmbed);
        
        if(!message.author.hasPermissions("ADMINISTRATOR")) {
          let blacklistpermsEmbed = new Discord.RichEmbed()
          .setTitle(`⛔__**ERREUR**__⛔`)
          .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
          .addField(`__Vous n'avez pas les permissions requises !__`, `__`)
          .addField(`╚═══════════════════════════════════════════════╝`, `__`)
         .setTimestamp();
         
         message.channel.send(blacklistpermsEmbed);
        }
      } else {
        let filter = m => m.author.id === message.author.id;
              
            bot.fetchUser(userToAdd).then(user => {
              const blacklistEmbed = new Discord.RichEmbed()
              .setTitle("⛔__**Utilisateur Ajouté à la Blacklist**__⛔")
              .setColor("RANDOM")
              .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
              .addField("🔡 Pseudo", user.username)
              .addField("#⃣  Tag", user.discriminator)
              .addField("🆔 ID", user.id)
              .addField("📰 Raison", reason)
              .addField(`╚═══════════════════════════════════════════════╝`, `__`)
              .setTimestamp();
              
              let logsblacklistEmbed = new Discord.RichEmbed()
              .setTitle(`__**🎆LOGS🎆**__`)
              .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
              .addField(`╔════════════════════◃◖⟪0⟫◗▹═══════════════════╗`, `__`)
              .addField(`__<@${message.author.id}> vient d'utiliser la commande BlackList !__`, `__`)
              .addField(`╚═══════════════════════════════════════════════╝`, `__`)
              .setTimestamp();

              let blacklistRole = message.guild.roles.find(`name`, 'blacklist');

              if (!blacklistRole) {
                try {
                  blacklistRole = message.guild.createRole({
                    name: "blacklist",
                    color: "#000000",
                    permissions: []
                  });
                  message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(blacklistRole, {
                      SEND_MESSAGES: false,
                      VIEW_CHANNEL: false,
                      SPEAK: false,
                      CONNECT: false,
                      CREATE_INSTANT_INVITE: false,
                      SEND_TTS_MESSAGES: false,
                      ADD_REACTIONS: false                  
                    });
                  });
                } catch (e) {
                  console.log(e.stack)
                }
              };
              
              
              logsChannel.send(logsblacklistEmbed)
              message.channel.send(blacklistEmbed);
              message.channel.send(blacklistaddEmbed);
              userToAdd.addRole(blacklistRole.id);
              
              blacklist[userToAdd] = {
                pseudo: user.username,
                tag: user.discriminator,
                id: user.id,
                raison: reason,
              };
              fs.writeFile(
                "blacklist.json",
                JSON.stringify(blacklist, null, "\t"),
                err => {
                  if (err) console.error(err);
                }
                );
              });
        }
      }
    } catch (e) {
      console.log(e);
      message.channel.send(`Erreur: \`${e.message}\``);
    }
  };
  
  module.exports.help = {
    name: ("blacklist")
  };