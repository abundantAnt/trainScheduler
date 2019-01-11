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
  var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
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

  alert("Trip successfully added");

  $("#name-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#rate-input").val("");
};
});

database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().Name;
  var trainDest = childSnapshot.val().Destination;
  var trainTime = childSnapshot.val().Time;
  var trainFreq = childSnapshot.val().FRQ;

  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  var timePretty = moment.unix(trainTime).format("HH:mm");
  console.log(timePretty);

  // var minsAway = moment().diff(moment(trainTime, "X"), "mins");
  
  var $tr = $("<tr>");
  $tr
    .append(`<td>${trainName}</td>`)
    .append(`<td>${trainDest}</td>`)
    .append(`<td>${trainFreq}</td>`)
    .append(`<td>~</td>`)
    .append(`<td>~</td>`);
    
  
    // select table's body and append employee table row
  //   $("tbody#employee-info").append($tr);

  // var newRow = $("<tr>").append(
  //   $("<td>").text(trainName),
  //   $("<td>").text(trainDest),
  //   $("<td>").text(trainFreq),
  //   $("<td>").text(timePretty),
  //   $("<td>").text(minsAway),
  $("#tbody#train-info").append($tr);
});

  // Append the new row to the table
 





// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

// var currentTime = moment();
// $("#currentTime").text(currentTime);

// // Assumptions
// var tFrequency = 3;

// // Time is 3:30 AM
// var firstTime = "03:30";

// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));