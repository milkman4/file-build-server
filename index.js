var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

function startFileBuild(socket) {
  let prog = 0;
  let interval = setInterval(() => {
    prog += 10;
    socket.emit('progress', prog);
    if (prog === 100) {
      socket.emit('complete');
      clearInterval(interval);
    }
  }, 1000);
}

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log(' a user disconnected');
  });

  startFileBuild(socket);
});

http.listen(3005, function() {
  console.log('listening on *:3005');
});
