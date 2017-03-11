var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

module.exports = function (times, hour, minute, start, end){
    rule.dayOfWeek = [0, new schedule.Range(start, end)];
    rule.hour = hour;
    rule.minute = minute;

    var j = schedule.scheduleJob(rule, function(){
        times.times = Number((Math.random(1)*50*100).toFixed(0));
    });
}
