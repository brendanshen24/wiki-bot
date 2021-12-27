require("dotenv").config();
const animeTitles = require('./animeList.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const messageCheck = message =>{
    const findanime = !!animeTitles.find((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(message);
    });
    return findanime
}

const getMetadata = message => {
    let name = ''
    let repeats = 0
    const findnameinstring = !!animeTitles.find((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.exec(message) != null && repeats <= 0) {
            name += regex.exec(message)[0]
            repeats += 1
        }
    });
    console.log(name)
}

client.on('messageCreate', (message) =>{
    console.log(`[${message.author.tag}]: ${message.content}`)
    if (messageCheck(message.content) === true) {
        message.reply('fuck you virgin go touch some grass')
        getMetadata(message.content)
    }
})

client.login(process.env.WEEB_BOT_TOKEN);