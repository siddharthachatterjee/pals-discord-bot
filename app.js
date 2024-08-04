import {Client, GatewayIntentBits} from "discord.js";
import {GoogleGenerativeAI} from "@google/generative-ai"
import "dotenv/config";
import {writeFile, readFile} from "fs/promises"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

let dataObj = {};

const fetchData = async () => {
    try {
        const data = await readFile("data.txt", {encoding:"utf-8"});
        dataObj = JSON.parse(data);
    }
    catch (err) {
        console.error(err)
    }
}


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    client.channels.fetch(process.env.CHANNEL_ID).then(channel => {
        const {lastDate} = dataObj 
        let date = new Date(dataObj.date);
        let current = new Date();
        let diff = Math.floor((current - date)/(1000 * 60 * 60 * 24)) +  1;
        if (diff > lastDate) {
            channel.send("Sid has ghosted for " + diff + " days");
        }
        dataObj.lastDate = diff
        writeFile("data.txt", JSON.stringify(dataObj))
    })
})

client.on("messageCreate", message => {
    try {
        if (message.mentions && message.mentions.users.first().bot) {
            (async () => {
                let prompt = "Pretend you are Bronny James and answer: " + message.content
                const result = await model.generateContent(prompt)
                const text = await result.response
                message.reply(text.text())
            })()
        }
    }
    catch(err) {
        
    }

})

const run = () => {
    fetchData()
    client.login(process.env.DISCORD_API_KEY);
}

run();
