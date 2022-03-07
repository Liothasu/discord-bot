const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS
  ]
});

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong!")
  .addUserOption(option => option.setName("user").setDescription("choose a user you want to mention").setRequired(false))

const prefix = "!";

Client.login(process.env.TOKEN);

Client.on("ready", async () => {


  //Client.application.commands.create(data);
  Client.guilds.cache.get("747543520562380941").commands.create(data);

  console.log("The bot is ready bitch !");
});

Client.on("messageCreate", message => {
  if (message.member.permissions.has("MANAGE_MESSAGES")) {
    if (message.content.startsWith(prefix + "clear")) {
      let args = message.content.split(" ");

      if (args[1] == undefined) {
        message.reply("Number of messages not or badly defined.");
      }
      else {
        let number = parseInt(args[1]);

        if (isNaN(number)) {
          message.reply("Number of messages not or badly defined.");
        }
        else {
          message.channel.bulkDelete(number).then(messages => {
            console.log("successful deletion " + messages.size + " of messages!");
          }).catch(err => {
            console.log("clear error: " + err);
          })
        }
      }
    }
  }
});

Client.on("guildMemberAdd", member => {
  console.log("a member has arrived.");
  //<@3483439583943>
  Client.channels.cache.get("747908034428403784").send("<@" + member.id + "> est arrivé;");
  member.roles.add("747543650078294096");

});

Client.on("guildMemberRemove", member => {
  console.log("a member has left the server...");
  Client.channels.cache.get("747908034428403784").send(member.displayName + "a quitté le serveur.");
});

Client.on("interactionCreate", interaction => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "ping") {
      let user = interaction.options.getUser("user")

      if (user != undefined) {
        interaction.reply("pong <@" + user.id + ">");
      }
      else {
        interaction.reply("pong");
      }
    }
  }
})

Client.on("messageCreate", message => {
  if (message.author.bot) return;

  //!help
  if (message.content === prefix + "help") {
    const embed = new Discord.MessageEmbed()

      .setColor("#0099ff")
      .setTitle("List of commands")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "Lio", iconURL: "https://64.media.tumblr.com/6b21bf38954711385c2cb3a3fc010643/1e8e7d8c8d42d10a-f2/s400x600/ba27a1a7a6c645a607c1e3b256427ea5076cbe13.png", url: "https://discord.js.org/"
      })
      .setDescription("You will find the list of the bot's commands")
      .addField("**!help**: ", "Displays the list of commands")
      .addField("**!ping**: ", "You send back pong!")
      .addField("!unknow", "In progress...")
      .setFooter({ text: "Author : R@7HY©", url: "https://64.media.tumblr.com/6b21bf38954711385c2cb3a3fc010643/1e8e7d8c8d42d10a-f2/s400x600/ba27a1a7a6c645a607c1e3b256427ea5076cbe13.png" });

    message.channel.send({ embeds: [embed] });
  }

  //message.reply("message reçu !");
  //message.channel.send("message reçu !");

  if (message.content === prefix + "ping") {
    message.reply("pong !");
  }
});