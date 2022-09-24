const express = require('express')
const app = express()
const port = 3000


const tmi = require('tmi.js');
const cardlist = require('./cardList.json')
const cardNames = Object.keys(cardlist)
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


let imageUrl="https://crystal-cdn4.crystalcommerce.com/photos/6791177/medium/cardback.jpg";
app.get('/', (req, res) => {
	  let html="<html><script> function timedRefresh(timeoutPeriod) { setTimeout(\"location.reload(true);\",timeoutPeriod); } window.onload = timedRefresh(5000) ;</script><img src="+imageUrl+"/><html>"
	  console.log("Displaying "+imageUrl);
	  res.send(html)
})

app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})








// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {

    cardNames.forEach((name)=>{
	if (commandName.toLowerCase().indexOf(name.toLowerCase()) > -1 ) {
		client.say(target,cardlist[name])
		imageUrl=cardlist[name]
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

