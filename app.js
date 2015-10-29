'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var academy = require('./timetables/academy.json');
var timetable = require('./timetable.js');
var port = process.env.PORT || 4200

app.use(express.static('public'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {

    function broadcastTimes() {
        var dateNow = new Date();
        dateNow.setHours(14);

        var times = timetable.leavingSoon(dateNow, academy);

        client.broadcast.emit('latestTimes', times);
    }

    broadcastTimes();

    setInterval(function() {
        broadcastTimes();
    }, 10000);

});

server.listen(port);