/* Train Scheduler */
// basic run down...

// Moments.js to adjust time...

// Firebase to host Arrival and Departure data...
// up to date information about various trains... 
// arrival times
// minutes until they arrive at their next station

/* the BASICS */

// Adding trains... from form
// ("#add-train-name") trainName
// ("#add-destination") trainDestination
// ("#add-train-time") trainTime
// ("#add-frequency") trainFreq
// $("button")on("click", type="submit")

// push to tabel 
//row: ("#new-train")
// td: ("#new-train-name")
// p: ("#new-name")
// td: ("#new-destination-location")
// p: ("#new-destination")
// td: ("#new-frequency-min")
// p: ("#new-frequency")
// td: ("#new-next-arrival")
// p: ("#next-arrival")
// td: ("#new-minutes-away")
// p: ("#new-minutes")

// Grabbed values from text-boxes
// function collectNewTrain() {}



function calculateTrainData() {

    var tFrequency = newTrainF;

    var firstTime = newTrainT;

    console.log("first time: " + firstTime + "frequency : " + tFrequency)

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("first time converted" + firstTimeConverted);

    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference in time: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log("train remainder " + tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("Minutes until next train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

    newTrainNext = nextTrain;
    newTrainMinutesAway = tMinutesTillTrain;
   


    return [newTrainNext, newTrainMinutesAway];
}

// result = calculateTrainData();


// variables for trains... 
// var 1 - current time
// var 2 - train time
// var 3 - difference
// var 4 - var3/ frequency
// var 5 - convert var4 to minutes

var currentTime = moment();

var trainTime;
var nextTrain;
var trainOutput;

// trainName = $("#add-train-name").val().trim();
// trainDestination = $("#add-destination").val().trim();
// trainTime = $(("#add-train-time")).val().trim();
// trainFreq = $("#add-frequency").val().trim();


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBdhJJ-YJO2oHd9JgmtQd-N11CvfhMgzV4",
    authDomain: "train-scheduler-hw6.firebaseapp.com",
    databaseURL: "https://train-scheduler-hw6.firebaseio.com",
    projectId: "train-scheduler-hw6",
    storageBucket: "train-scheduler-hw6.appspot.com",
    messagingSenderId: "942549326125"
};
firebase.initializeApp(config);

var database = firebase.database();

//Capture on click

$("button").on("click", function (event) {
    // stop the form from submitting
    event.preventDefault();
    console.log("click.");

    newTrainN = $("#add-train-name").val().trim();
    newTrainD = $("#add-destination").val().trim();
    newTrainT = $(("#add-train-time")).val().trim();
    newTrainF = $("#add-frequency").val().trim();


    calculateTrainData();




    // Code for "Setting values in the database"
    database.ref().push({
        trainName: newTrainN,
        trainDestination: newTrainD,
        trainFreq: newTrainF,
        nextTrain: newTrainNext,
        trainTimeAway: newTrainMinutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    })
});
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    $("#btn-add").click(function () {
        var markup = "<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" + childSnapshot.val().trainFreq + "</td><td>" + childSnapshot.val().nextTrain + + "</td><td>" + childSnapshot.val().trainTimeAway + "</td></tr>";
        $("table tbody").append(markup);
    });

    // in case of error
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});