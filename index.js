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

class TodoItems {
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
  try {
    todoTempList[0].text = ($('#tB' + todoTempList[0].id + '').val());
    if (todoTempList[0].text != "") {
      todoPermList.push(todoTempList[0]);
      todoTempList = [];
    }
  } catch(err) {
    console.log(err);
  }
  if (todoTempList.length == 0) {
    var todoItem = new TodoItems(id);
    todoTempList.push(todoItem);
    let todo = "<input id='tB" + id + "' class='todoBoxes' type='text' placeholder='Write Here...' spellcheck='false'/><p id='tIT" + id + "' class='todoIndentText'>Write Here...</p><button id='tBB" + id + "' class='todoBoxButton' type='button' onclick='addTodo'></button><button id='tRB" + id + "' class='todoRemoveButton' type='button' onclick='removeTodoByID(" + id + ")'></button>";
    $('#tRB' + id + '').css("left","" + ($("#tIT" + id + "").width() + 20) + "px");
    $('#todo').append(todo);
    $('#tB' + id + '').focus();
    id++;
  }
}

function removeTodoByID(id) {
  try {
    if (todoTempList[0].id == id) {
      todoTempList = [];
    }
  }
  catch(err) {
    console.log(err);
  } 
  $('#tB' + id + '').remove();
  $('#tBB' + id + '').remove();
  $('#tRB' + id + '').remove();
  $('#tIT' + id + '').remove();
}

updateTime();

$("input.todoBoxes").change(function(){
  for (input in todoPermList) {
    console.log((input, input.id, input.text));
    $('#tIT' + input.id + '').text(input.text);
    $('#tRB' + input.id + '').css("left","" + ($("#tIT" + input.id + "").width() + 20) + "px");
  }
});

