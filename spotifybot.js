const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQB1uUgju-1drfqTg6CyKn6nX7k8TLVRiiZORVDNJVXsOl_r_KvCLvzFBByxDs86_mEEghCi1rKgKxq83pBDCkAsuqalXkU3FxZXTUwCvG9Gnz1fsmmISBJyjJBMJLqiIBSswZVglYu8wH7yoClSK1gMm1GFEH3nOTUJx_vlapbrV07iMcZYMQ2Q3bBoyVeHNr31f1zkFiFD0QJAr5z38a8yfBoSvVitz2-KUjpoapoileEK9vMEFU6e"
const Discord = require('discord.js');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);
const client = new Discord.Client();

client.once('ready', message =>{
    console.log("Spotify Bot is On!");
});



 //Get profile data
 function getmydata(){
     (async () => {
         const me = await spotifyApi.getMe();
         var names = getPlaylists(me.body.id);
         console.log(names)
     })().catch(e => {
         console.error(e);
     });
 }

async function getPlaylists(id){
    const data = await spotifyApi.getUserPlaylists(id);
    var names = [data.body.items.length];
    let i = 0;
    for(let playlist of data.body.items){
        names[i] = playlist.name;
        ++i;
    }
    console.log(names)
    return "test";
}
 
 client.on('message', message =>{
    if(message.content === '!getme'){
        (async ()=>{
            var names = await getmydata();
        })
        console.log(names)
        let msg = "";
        // for(let name of playlists){
        //     msg = name+ "\n"
        // }
        message.reply(msg);
    }
 })
 client.login('ODQ3OTc4OTIwNjg2NzgwNDY3.YLF76Q.gcW0_T8XLJxNSJmHDQ_8_UvSH1w');