'use strict';

var Timetable = function () {

    function parseTime(time) {
        var busTime = new Date(),
            s = time.split("."),
            hours = s[0],
            minutes = s[1];
        busTime.setHours(hours);
        busTime.setMinutes(minutes);

        return busTime;
    }

    function padZeros(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    function getDateWithHourOffset(dateNow, offset) {
        var lastTime = new Date(dateNow.getTime());
        lastTime.setHours(lastTime.getHours() + offset);
        return lastTime;
    }

    function formatBusTime(busTime, busObject) {
        var h = busTime.getHours();
        var m = busTime.getMinutes();

        var time = padZeros(h.toString()) + ':' + padZeros(m.toString());
        return time + ' ' + busObject.destination;
    }

    function leavingSoon(currentTime, jsonTimetable) {

        var arr = [];

        for (var i = 0; i < jsonTimetable.length; i++) {
            var obj = jsonTimetable[i];

            var busTime = parseTime(obj.time);
            var lastTime = getDateWithHourOffset(currentTime, 1);

            if ((currentTime < busTime) && (busTime < lastTime)) {
                console.log('foundbus: ' + busTime);

                var busText = formatBusTime(busTime, obj);
                arr.push(busText);
            }
        }

        return arr;
    }

    return {
        formatBusTime: formatBusTime,
        getDateWithHourOffset: getDateWithHourOffset,
        padZeros: padZeros,
        parseTime: parseTime,
        leavingSoon: leavingSoon
    }

};

module.exports = Timetable();