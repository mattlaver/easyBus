var board = new DepartureBoard (document.getElementById ('academy'), { rowCount: 8, letterCount: 26 });

board.setValue (['Academy Bus Timetable']);

var host = location.origin.replace(/^http/, 'ws')
var socket = io.connect(host);

var url = document.URL;
var isStation = url.toLowerCase().indexOf("station") > -1;
var isHanger = url.toLowerCase().indexOf("hanger") > -1;

socket.on('latestTimes', function(data) {
    if (isStation) {
        board.setValue (data.station);
    } else if (isHanger) {
        board.setValue (data.hanger);
    } else board.setValue (data.academy);

});
