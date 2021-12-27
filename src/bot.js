require("dotenv").config();
const animeTitles = require('../animeList.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const messageCheck = message =>{
    return !!animeTitles.find((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(message);
    })
}

const getMetadata = message => {
    let name = ''
    let repeats = 0
    !!animeTitles.find((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.exec(message) != null && repeats <= 0) {
            name += regex.exec(message)[0]
            repeats += 1
        }
    });
    return name
}

const getsendWikipedia = message =>{
    let request = require('request');
    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${getMetadata(message.content)} +"&format=json`
    request(url, function(err, response, body) {
        if (err) {
            let error = "cannot connect to the server";
            console.log(error);
        } else {
            let wiki = JSON.parse(body);
            let result = wiki[3][0];
            message.reply('fuck you virgin, stop watching ' + getMetadata(message.content) +' and go touch some grass ' + '\n' + result)
        }
    });
}

client.on('messageCreate', (message) =>{
    console.log(`[${message.author.tag}]: ${message.content}`)
    if (messageCheck(message.content) === true && message.author.id != client.user.id) {
        //message.reply('fuck you virgin, stop watching ' + getMetadata(message.content) +' and go touch some grass ')
        getsendWikipedia(message)
    }
})

client.login(process.env.WEEB_BOT_TOKEN);