import { Client, localConfig, colors } from 'chatapp.js'

let bot = new Client({
  name: "BotName",
  websocket: "wss://chatappbackend.sirifromphotop.repl.co (or any websocket server)",
  apikey: "ApiKey",
  color: 1 //choose a number 1 - 13 for the color
});

bot.onPost(function(msg) {
  /*put code here
  if (msg == "/test-command") {
    //put code to execute when that text is sent here
  }*/
})
