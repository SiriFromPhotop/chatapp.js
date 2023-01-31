bot.onReady(function() { // go to onReady.js to know how to use this
  bot.onPost(function(msg) {
    if (msg == "module_test") {
      bot.send("Success!");
    }
  })
})
