var Timetable = function () {};

Timetable.prototype.leavingSoon = function (currentTime, jsonTimetable) {

    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    var arr = new Array();

    for (var i=0; i < jsonTimetable.length; i++) {
        var obj = jsonTimetable[i];

        // get bus time
        var busTime = new Date(),
            s = obj.time.split("."),
            hours = s[0],
            minutes = s[1];
        busTime.setHours(hours);
        busTime.setMinutes(minutes);

        // get date until
        var lastTime = new Date(currentTime.getTime());
        lastTime.setHours(lastTime.getHours() + 1);


        if ((currentTime < busTime) && (busTime < lastTime)  ){
            console.log('foundbus: ' + busTime);

            var h = busTime.getHours();
            var m = busTime.getMinutes();

            var time = pad(h.toString()) + ':' + pad(m.toString());
            arr.push(time + ' ' + obj.destination);
        }
    }

    return arr;
};

exports.Timetable = new Timetable();