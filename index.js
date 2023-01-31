import WebSocket from 'ws';
export let localConfig = {
  "rate": 0,
  "addToRate": function() {
    this.rate++
  },
  "resetRate": function() {
    this.rate == 0
  }
}

export class Client {
  constructor(jsonreal) {
    this.name = jsonreal.name;
    this.ws = new WebSocket(jsonreal.websocket);
    this.apikey = jsonreal.apikey
  }
  
  send(string) {
    if (localConfig.rate >= 20) {
      setTimeout(() => { localConfig.rate = 0 }, 2000);
      console.log("Bot has been rate limited for posting")
      return;
    } else {
      this.ws.send(JSON.stringify({
        user: this.name,
        content: string,
        isNewUserAlert: false,
        ip: this.apikey
      }))
      localConfig.addToRate();
    }
  }
  onPost(callback) {
    if (typeof callback == "function") {
      this.ws.on("message", (datajson) => {
        const data = JSON.parse(datajson)
        const msg = `${data.plainMSG}`;
        callback(msg)
      })
    }
  }
  onReady(callback) {
    if (typeof callback == "function") {
      this.ws.on('open', () => {
        this.ws.send(JSON.stringify({
          user: this.name,
          isNewUserAlert: true,
          ip: this.apikey
        }))
        callback()
      })
    }
  }
}
