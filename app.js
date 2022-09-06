const {Client, GatewayIntentBits, MessageEmbed, quote} = require("discord.js");
const {kfpQuotes} = require("./quotes");


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

//console.log(new Date());
client.on("ready", () => {

    client.channels.fetch("968358452839731264").then(channel => {
        setInterval(() => {
            let release = new Date(2024, 3, 8);
            let current = new Date();
            let days = Math.ceil((release - current)/(1000));
            channel.send(days + " seconds till Kung Fu Panda 4");
        }, 1000 * 3600 * 24);
    })
})


client.on("messageCreate", message => {
 //   console.log(message);
    if (message.content ==="!kfp4") {
        let release = new Date(2024, 3, 8);
        let current = new Date();
        let days = Math.ceil((release - current)/(1000));
        message.reply("Hey, " + message.author.username + ", " + days + " seconds till Kung Fu Panda 4");
    }
    else if (message.content === "!kfp-quote") {
        let i = Math.floor(Math.random() * kfpQuotes.length);
      //  console.log(i);
        message.reply(kfpQuotes[i]);
    }
})
console.log(kfpQuotes.length)
client.login("MTAxNjEwODUyODgxNTA0Njc5Ng.G8xb-S.SuxbBnC_9x6Mr7QkrXZffBwseiIhxQuTtzwbGU");