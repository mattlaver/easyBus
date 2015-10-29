var assert = require('assert');
var timetable = require('../timetable.js');
var academy = require('../timetables/academy.json');

describe('Timetable', function() {

    describe('formatBusTime', function() {
       it('should return correct display format for bus time', function() {
           var busTime = new Date();
           busTime.setHours(7);
           busTime.setMinutes(5);

           var bus =
               {
                   "bus": "A",
                   "time": "07.05",
                   "destination": "Eaton Green, Station"
               };

           var label = timetable.formatBusTime(busTime, bus);
           assert.equal('07:05 Eaton Green, Station', label);
       })
    });

    describe('getDateWithHourOffset', function() {
        it('should return date specified hour offset', function() {
            var date = new Date();
            date.setHours(3);

            var dateWithOffset = timetable.getDateWithHourOffset(date, 1);

            assert.equal(4, dateWithOffset.getHours());
        })
    });

    describe('padZeros', function() {
       it('should pad zeros on numbers below 10', function() {
           assert.equal('09', timetable.padZeros(9));
       });

       it('should not effect numbers above 9', function() {
           assert.equal('11', timetable.padZeros(11));
       })
    });

    describe('parseTime', function () {
        it('should convert hour correctly', function() {
            var time = timetable.parseTime('10.30');
            assert.equal(10, time.getHours());
        });

        it('should convert minute correctly', function() {
            var time = timetable.parseTime('10.33');
            assert.equal(33, time.getMinutes());
        })

    });
});