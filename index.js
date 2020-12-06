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

class todo {
  constructor(id) {
    this.completed = false;
    this.text = '';
    this.id = id;
  }
}

function updateTime() {
  var fullDate = new Date().toString();
  var weekDay = dates[fullDate.substr(0, 3)];
  var monthDay = months[fullDate.substr(4, 3)];
  var numberDay = fullDate.substr(8, 2);
  var yearDay = fullDate.substr(11, 4);
  var time = fullDate.substr(16, 8);

  let dateTimeDate = weekDay + " " + monthDay + " " + numberDay + " " + yearDay;
  let dateTimeTime = time;

  $('#dateTimeDate').text(dateTimeDate);
  $('#dateTimeTime').text(dateTimeTime);
  
  setTimeout(updateTime, 1000);
}

var todoTempList = [];
var todoPermList = [];

var id = 0;
function addTodo() {
  const todoItem = new todo(id);
  todoTempList.push(todoItem);
  let todo = "<input id='tB" + id + "' class='todoBoxes' type='text' placeholder='Write Here...' spellcheck='false'/><button id='tBB" + id + "' class='todoBoxButton' type='button' onclick='addTodo'></button>";
  $('#todo').append(todo);
  $('#tB' + id + '').focus();
  id++;
}

updateTime();

$('html' ).mousedown(function() {
  for(let i of todoTempList) {
    i.text = document.getElementById('tB' + id + '').value;
    if (!($('#tB' + i.id + '').is(":focus")) && i.text != "") {
      $('#tB' + id + '').remove();
      $('#tBB' + id + '').remove();
    }
  }
});
