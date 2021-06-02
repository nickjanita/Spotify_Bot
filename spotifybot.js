const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Discord = require('discord.js');

const discordToken = "ODQ3OTc4OTIwNjg2NzgwNDY3.YLF76Q.DXIj6c3zBtoDSZlZWle0sXTjJHc";
const spotifyToken = "BQBer6_x7sgDjajG7Js7oGmuS7w-ZfHV0Z_AhJM5TLV7DzMwwg8tx-Y2hL20IEfVDPHpMgAw2XAILJBtlcKvsKF3PV35ifFt_sqfGMeDagM72qeKHlsPlGWjeBm0MG4O6k7U2yWXHP8tp9JsGpZvHZB1lE9-AQWKKbQUqqM8ciwM84gI0WUA4GRPbltwSQDraZ6Z9FE6Pn694h07N4ASONquo2_EIdAssS0tWueIge5CQCB-mY1x1cAs"
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
    console.log(client.commands)
	if (!client.commands.has(command)) return;
    console.log('We are here');
	try {
		client.commands.get(command).execute(message, spotifyApi);
        message.reply("Running Command...")
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
    
    
 })
 client.login(discordToken);