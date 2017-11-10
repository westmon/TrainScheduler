

  var config = {
    apiKey: "AIzaSyDKJNJXMYOuCMiMknMLn_jRelUqvbZXFt0",
    authDomain: "trainscheduler-c6a2b.firebaseapp.com",
    databaseURL: "https://trainscheduler-c6a2b.firebaseio.com",
    projectId: "trainscheduler-c6a2b",
    storageBucket: "",
    messagingSenderId: "999138782366"
  };


firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

$("#add-train").on("click", function(event) {
   event.preventDefault();
   
   database.ref().push({
        name: $("#name-input").val(),
        destination: $("#destination-input").val(),
        time: $("#time-input").val(),
        frequency: $("#frequency-input").val(),
      });
  

   $("#name-input").val("");
   $("#destination-input").val("");
   $("#time-input").val("");
   $("#frequency-input").val("");


});

  database.ref().on("child_added", function(childSnapshot) {

    var firstTime = childSnapshot.val().time;
    var tFrequency = childSnapshot.val().frequency;
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

      $(".table").append("<tr><td> " + childSnapshot.val().name +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency + 
        " </td><td> " + moment(nextTrain).format("hh:mm") +
        " </td><td> " + tMinutesTillTrain +
        " </td></tr>");

    // Handle the errors
    }, function(errorObject) {
      // console.log("Errors handled: " + errorObject.code);
    });