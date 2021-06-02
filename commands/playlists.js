module.exports = {
	name: 'playlists',
	description: 'exports playlists of user',
	execute(message, spotifyApi) {
		playlists(message,spotifyApi);
	},
};

async function getmydata(spotifyApi){
    const me = await spotifyApi.getMe();
    var names = await getPlaylists(me.body.id,spotifyApi);
    return names
}

async function getPlaylists(id, spotifyApi){
    const data = await spotifyApi.getUserPlaylists(id);
    var names = [data.body.items.length];
    let i = 0;
    for(let playlist of data.body.items){
        names[i] = playlist.name;
        ++i;
    }
    return names;
}

async function playlists(message, spotifyApi){
    var names =  await getmydata(spotifyApi)
    message.channel.send("Here are your current playlists!")
    message.channel.send(names);        
} 
