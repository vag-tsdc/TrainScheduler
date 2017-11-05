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

// result = calculateTrainData();


// to be input

// calculate the ish
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

    return [tFrequency, firstTime, firstTimeConverted, currentTime, diffTime, tRemainder, tMinutesTillTrain, nextTrain]
};

function fireBaseSet() {
    tFrequency,
    firstTime,
    firstTimeConverted,
    currentTime,
    diffTime,
    tRemainder,
    tMinutesTillTrain,
    nextTrain
}


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

    var newTrainN = $("#add-train-name").val().trim();
    var newTrainD = $("#add-destination").val().trim();
    var newTrainT = $(("#add-train-time")).val().trim();
    var newTrainF = $("#add-frequency").val().trim();

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

    nextTrainTime = moment(nextTrain).format("hh:mm");


    // Code for "Setting values in the database"
    database.ref().push({
        trainName: newTrainN,
        trainDestination: newTrainD,
        trainFreq: tFrequency,
        nextTrain: nextTrainTime,
        trainTimeAway: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    })


});
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function (childSnapshot) {

    $("#btn-add").click(function () {
        var markup = "<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" + childSnapshot.val().trainFreq + "</td><td>" + childSnapshot.val().newTrainNext + "</td><td>" + childSnapshot.val().trainTimeAway + "</td></tr>";
        $("table tbody").append(markup);
    });

    // in case of error
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});