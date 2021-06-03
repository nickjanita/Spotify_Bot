const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Discord = require('discord.js');

const discordToken = config.discordToken;
const spotifyToken = config.spotifyToken;
const prefix = "!";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(spotifyToken);

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(command)
	client.commands.set(command.name, command);

}

client.once('ready', message =>{
    console.log("Spotify Bot is On!");
});

 
  client.on('message', message =>{
    if (!message.content.startsWith(prefix)) return;
    
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;

	try {
        message.reply("Running Command...")
		client.commands.get(command).execute(message, spotifyApi);
        
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
    
    
 })
 client.login(discordToken);