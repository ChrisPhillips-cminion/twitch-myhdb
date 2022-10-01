const express = require('express')
const app = express()
app.use(express.static('images'));

const port = 8080 


const tmi = require('tmi.js');
const cardlist = require('./cardList.json')
let cardNames = Object.keys(cardlist)

cardNames.sort(function(a, b){
  return a.length - b.length;
});

const opts = {
	options: { debug: true },
	  identity: {
		      username: 'cminion',
		      password: process.env.accesscode
		    },
	  channels: [
		      'that_dabi_guy'
		    ]
};

console.log(opts)
let imageUrl={}
opts.channels.forEach((chan)=>{
app.get('/'+chan, (req, res) => {
	  let html="<html><script> function timedRefresh(timeoutPeriod) { setTimeout(\"location.reload(true);\",timeoutPeriod); } window.onload = timedRefresh(2000) ;</script><img src="+imageUrl[chan]+"/><html>"
	  console.log("Displaying "+imageUrl[chan]);
	  res.send(html)
})
})
app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('error', ((e)=>{
	console.log(e)
}));

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (chan, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(chan, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {

    cardNames.forEach((name)=>{
	 ///console.log(commandName.toLowerCase()+" - "+name.toLowerCase())
	if (commandName.toLowerCase().indexOf(name.toLowerCase()) > -1 ) {
		chanShort=chan.substring(1)
		console.log('sending to '+chanShort);
		imageUrl[chanShort]=cardlist[name]
	}
    })

    //console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  client.say(opts.channels[0], `Loading bot ....`)
}

