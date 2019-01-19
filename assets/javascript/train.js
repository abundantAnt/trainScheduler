var config = {
  apiKey: "AIzaSyAZNkGhciPeb5p61nUzOMjyIxhYcQLm7ts",
  authDomain: "trainscheduleryo.firebaseapp.com",
  databaseURL: "https://trainscheduleryo.firebaseio.com",
  projectId: "trainscheduleryo",
  storageBucket: "trainscheduleryo.appspot.com",
  messagingSenderId: "84196219697"
};

firebase.initializeApp(config);

var database = firebase.database();

function currentTime() {
var current = moment().format('YYYY-MM-DD HH:mm:ss');
$("#currentTime").html(current);
setTimeout(currentTime, 1000);
};

currentTime();

$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var name = $("#name-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var time = $("#time-input").val().trim();
  var rate = $("#rate-input").val().trim();

  var newTrip = {
    Name: name,
    Destination: dest,
    Time: time,
    FRQ: rate
  };

  if (
    $("#name-input").val().trim() === "" ||
    $("#dest-input").val().trim() === "" ||
    $("#time-input").val().trim() === "" ||
    $("#rate-input").val().trim() === "") {

      alert("Please complete all input fields");
    } 
    else {  
      database.ref().push(newTrip);
      
      console.log(newTrip.Name);
      console.log(newTrip.Destination);
      console.log(newTrip.Time);
      console.log(newTrip.FRQ);
      
      $("#name-input").val("");
      $("#dest-input").val("");
      $("#time-input").val("");
      $("#rate-input").val("");
      
      alert("Trip successfully added");
    };
  });

// index to create dynamic ID for next arrival minutes remaining
var count = 0;

database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().Name;
  var trainDest = childSnapshot.val().Destination;
  var trainTime = childSnapshot.val().Time;
  var trainFreq = childSnapshot.val().FRQ;

  var diffTime = moment().diff(moment(trainTime, "hh:mm"));
  var tRemainder = diffTime % trainFreq;
  var minsAway = moment(trainFreq - tRemainder, "minutes").format("m");
  
  var arrivalTime = moment().add(minsAway, "minutes").format("hh:mm");

  var $tr = $("<tr>");
  $tr
    .append(`<td>${trainName}</td>`)
    .append(`<td>${trainDest}</td>`)
    .append(`<td id="trainFreq${count}">${trainFreq}</td>`)
    .append(`<td id="arrivalTime${count}">${arrivalTime}</td>`)
    .append(`<td id="minsAway${count}">${minsAway}</td>`);
    
  $("tbody#train-info").append($tr);
  count++;
  // minsAwayUpdate();
});

function minsAwayUpdate() {
  for (let i = 0; i < count; i++) {
    var $minsAway = parseInt($(`#minsAway${i}`).text());

    if ($minsAway) {
      $minsAway--;
      $(`#minsAway${i}`).text($minsAway);
    }
    else {
      $minsAway = parseInt($(`#trainFreq${i}`).text());
      $(`#arrivalTime${i}`).text(moment().add($minsAway, "minutes").format("hh:mm"));
      $(`#minsAway${i}`).text($minsAway);
    }
  }
  setTimeout(minsAwayUpdate, 60000);
};

minsAwayUpdate();

  





