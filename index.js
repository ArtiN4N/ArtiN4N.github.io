let dates = {
  "Mon": "Monday",
  "Tue": "Tuesday",
  "Wed": "Wednesday",
  "Thu": "Thursday",
  "Fri": "Friday",
  "Sat": "Saturday",
  "Sun": "Sunday",
};

let months = {
  "Jan": "January",
  "Feb": "Febuary",
  "Mar": "March",
  "Apr": "April",
  "May": "May",
  "Jun": "June",
  "Jul": "July",
  "Aug": "August",
  "Sep": "September",
  "Oct": "October",
  "Nov": "November",
  "Dec": "December",
};

var fullDate = new Date().toString();
var weekDay = dates[fullDate.substr(0, 3)];
var monthDay = months[fullDate.substr(4, 3)];
var numberDay = fullDate.substr(8, 2);
var yearDay = fullDate.substr(11, 4);
var time = fullDate.substr(16, 8);

$j('h1#dateTimeDate').text(weekDay + " " + monthDay + " " + numberDay + " " + yearDay);
$j('h1#dateTimeTime').text(time);
