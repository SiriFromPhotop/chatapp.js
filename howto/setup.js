import { Client, localConfig } from 'chatappjs'

let bot = new Client({
  name: "BotName",
  websocket: "wss://chatappbackend.sirifromphotop.repl.co (or any websocket server)",
  apikey: "ApiKey"
});
