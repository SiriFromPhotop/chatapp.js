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

export let colors = ["white","red","orange","yellow","green","blue","purple","magenta","silver","blueviolet","chartreuse","cyan","fuchsia"]

export class Client {
  constructor(jsonreal) {
    this.name = jsonreal.name;
    this.ws = new WebSocket(jsonreal.websocket);
    this.apikey = jsonreal.apikey;
    if (colors[jsonreal.color] == undefined) {
      this.color = 1
    } else {
      this.color = colors[jsonreal.color - 1]
    }
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
        ip: this.apikey,
        color: this.color
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
      console.log("Establised Connection with Chatapp!")
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
  leave() {
    this.ws.send(JSON.stringify({
      user: this.name,
      isLeaveMessage: true
    }))
    throw new Error('Connection with Chatapp has ended.');
  }
  onEnd(callback) {
    if (typeof callback == "function") {
      this.ws.on('close', () => {
        console.log("Lost connection with Chatapp")
        callback()
      })
    }
  }
}
