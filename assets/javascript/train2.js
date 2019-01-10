// set up child_added event listener for firebase to send new information every time an employee is added and when the page loads
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  var name = childSnapshot.val().name;
  var role = childSnapshot.val().role;
  var rate = childSnapshot.val().rate;
  var startDate = childSnapshot.val().startDate;

  // create a table row for my employee
  var $tr = $("<tr>");
  $tr
    .append(`<td>${name}</td>`)
    .append(`<td>${role}</td>`)
    .append(`<td>${startDate}</td>`)
    .append(`<td>~</td>`)
    .append(`<td>${rate}</td>`)
    .append(`<td>~</td>`);

  // select table's body and append employee table row
  $("tbody#employee-info").append($tr);


});

$(document).ready(function() {

  // init firebase


  // save firebase database reference


  // add event listener for form submit
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var employeeData = {
      name: $("#name-input").val().trim(),
      role: $("#role-input").val().trim(),
      startDate: $("#start-input").val(),
      rate: parseInt($("#rate-input").val())
    };

    console.log(employeeData);

  });


});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBzrokPVZGwCZbxx31gq0OeCsCbR2Cmkac",
  authDomain: "class-activities-2c901.firebaseapp.com",
  databaseURL: "https://class-activities-2c901.firebaseio.com",
  projectId: "class-activities-2c901",
  storageBucket: "class-activities-2c901.appspot.com",
  messagingSenderId: "545446320727"
};
firebase.initializeApp(config);

// create reference to firebase's database
var database = firebase.database();

// Set Initial Counter
var initialValue = 100;

var clickCounter = initialValue;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
  // Print the initial data to the console.
  // Change the html to reflect the initial value.
  // Change the clickCounter to match the data in the database
  // Log the value of the clickCounter
  // Change the HTML Value
  // If any errors are experienced, log them to console.

// turn on firebase's event listener for value changes
database.ref().on("value", function(snapshot){  
  console.log(snapshot.val());
  // take value from database and save it to local variable to keep values in sync
  clickCounter = snapshot.val().clickCount;
  $("#click-value").text(clickCounter);

}, function(err) {
  console.log(err);
})

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#click-button").on("click", function() {

  // Reduce the clickCounter by 1
  clickCounter--;


  // Alert User and reset the counter
  if (clickCounter === 0) {
    clickCounter = initialValue;
  }

  // Save new value to Firebase
    database.ref().set({
      clickCount: clickCounter
    })

  // Log the value of clickCounter
    console.log(clickCounter);

});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue
  clickCounter = initialValue;

  // Save new value to Firebase
    database.ref().set({
      clickCount: clickCounter
    })

  // Log the value of clickCounter
    console.log(clickCounter);


  // Change the HTML Values

});

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyBzrokPVZGwCZbxx31gq0OeCsCbR2Cmkac",
  authDomain: "class-activities-2c901.firebaseapp.com",
  databaseURL: "https://class-activities-2c901.firebaseio.com",
  projectId: "class-activities-2c901",
  storageBucket: "class-activities-2c901.appspot.com",
  messagingSenderId: "545446320727"
};
firebase.initializeApp(config);


// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    highPrice = parseInt(snapshot.val().highPrice);
    highBidder = snapshot.val().highBidder;
  }

  // Change the HTML to reflect the stored values
  $("#highest-price").text(highPrice);
  $("#highest-bidder").text(highBidder);


  // Print the data to the console.
  console.log(highPrice, highBidder);


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val());

  if (isNaN(bidderPrice)) {
    alert("Give a real number");
    return false;
  }


  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});



Co