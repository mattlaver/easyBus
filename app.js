'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var academy = require('./timetables/academy.json');
var hanger = require('./timetables/hanger.json');
var station = require('./timetables/station.json');
var timetable = require('./timetable.js');
var port = process.env.PORT || 4200

app.use(express.static('public'));

app.get('*', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {

    function broadcastTimes() {
        var dateNow = new Date();

        var times = {
            academy: timetable.leavingSoon(dateNow, academy, 'Academy Departures'),
            hanger: timetable.leavingSoon(dateNow, hanger, 'Hanger 89 Departures'),
            station: timetable.leavingSoon(dateNow, station, 'Station Departures')
        }

        client.broadcast.emit('latestTimes', times);
    }

    broadcastTimes();

    setInterval(function() {
        broadcastTimes();
    }, 2000);

});

server.listen(port);