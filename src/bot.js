require("dotenv").config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const getsendWikipedia = (messagemethod,newmessage) =>{
    let request = require('request');
    let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ newmessage +"&format=json"
    request(url, function(err, response, body) {
        if (err) {
            let error = "cannot connect to the server";
            console.log(error);
        } else {
            let wiki = JSON.parse(body);
            let title = wiki[1][0];
            let result = wiki[3][0];
            if (title === undefined){
                messagemethod.reply('Sorry, your search turned up no results :(')
            }
            else{
                messagemethod.reply('You searched for ' + title +'. It\'s main article is located here: ' + '\n' + result)
            }
        }
    });
}

const commandHandle = message =>{
    messagelist = message.content.split(' ');
    newmessage = ''
    if (messagelist[0] === '!search'){
        for (let i = 1; i < messagelist.length; i++) {
            newmessage += messagelist[i]
            newmessage += ' '
        }
        getsendWikipedia(message,newmessage)
    }
}

client.on('messageCreate', (message) =>{
    if (message.content[0] == '!'){
        commandHandle(message)
    }
})

client.login(process.env.WIKI_BOT_TOKEN);