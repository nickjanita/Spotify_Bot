const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQC0K4Fcw7mDwYqrG6OETp0eZWlyShi5NQtuuILUrrZSnMsbD5GwTgKJLX1aw5WjdDbfYs-mCFz5mCajcsF3YXklJSDAO_5PERiPSasPDc4y_Hn8PYYCCJj_vwCa6fjMmDtkMlT5qneBrs0khojWXo6rqXECT6uM30v60akqHrj5sbuKWMxkW2j0GIeRRwzKHKCmBpkvdI5_XORegjHg28OJ07vwMGWhgIv6e_HeQpk7TsMl0wbCNouu"
const Discord = require('discord.js');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);
const client = new Discord.Client();

client.once('ready', message =>{
    console.log("Spotify Bot is On!");
});



 //Get profile data
 async function getmydata(){
    const me = await spotifyApi.getMe();
    var names = await getPlaylists(me.body.id);
    return names
 }

async function getPlaylists(id){
    const data = await spotifyApi.getUserPlaylists(id);
    var names = [data.body.items.length];
    let i = 0;
    for(let playlist of data.body.items){
        names[i] = playlist.name;
        ++i;
    }
    return names;
}
async function playlists(message){
    var names =  await getmydata()
    message.channel.send("Here are your current playlists!")
    message.channel.send(names);        
} 
  client.on('message', message =>{
      
        if(message.content === '!getme'){
            playlists(message)
        }
    
 })
 client.login('ODQ3OTc4OTIwNjg2NzgwNDY3.YLF76Q.Zln-MKglrchk9_PwPKNcAuXmu9o');