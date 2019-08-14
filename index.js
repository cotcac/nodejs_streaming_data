var express = require('express');
var app = express();
app.use(express.static("public"))
const stream = require("./stream")
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/watch.html');
});

app.get('/mp3', function (req, res) {
  res.sendFile(__dirname + '/public/listen.html');
});

app.get('/video', stream('./public/sample.mp4', 'video/mp4'))

app.get('/audio', stream('./public/sample.mp3', 'audio/mpeg'))


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});