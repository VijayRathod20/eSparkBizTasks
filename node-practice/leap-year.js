const promt = require('prompt-sync')();
var calendar = require('node-calendar');

const year = promt("Enter Year");

console.log(calendar.isleap(year));
