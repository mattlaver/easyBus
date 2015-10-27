'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var academy = require('./timetables/academy.json');
var timetable = require('./timetable.js');

app.use(express.static('public'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {

    client.on('messages', function(data) {
        client.emit('broad', data);
        client.broadcast.emit('broad',data);
    });

    setInterval(function() {
        var dateNow = new Date();
        var times = timetable.Timetable.leavingSoon(dateNow, academy);

       // console.log('times returned' + times)
        client.broadcast.emit('latestTimes', times);

    }, 10000);

});

server.listen(4200);