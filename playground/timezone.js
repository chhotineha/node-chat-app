var moment = require('moment');
// var date = moment();
// console.log(date.format('MMM'))
// console.log(date.format('MMM Do,YYYY'))
// console.log
var createAt = 1244;
var date = moment(createAt);
console.log(date.format('h:mm a'))