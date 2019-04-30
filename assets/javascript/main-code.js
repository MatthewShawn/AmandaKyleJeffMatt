// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1NRbc6LBMUYVcQk7q1qm_QSb_emqoX5I",
    authDomain: "foodfinders-bc.firebaseapp.com",
    databaseURL: "https://foodfinders-bc.firebaseio.com",
    projectId: "foodfinders-bc",
    storageBucket: "foodfinders-bc.appspot.com",
    messagingSenderId: "832785980119"
};
firebase.initializeApp(config);

var database = firebase.database();


// Initial hide logic.

$(document).ready(function () {

    $(".food-table").hide();
    $(".donor-form").hide();
    $(".pickup-form").hide();
    $("#request-received").hide();
    $(".map-div").hide();
    $("body").addClass("test");
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
})

// Home page ---> donor-register

$("#donate-button").on("click", function() {

    $(".donor-form").show();
    $("#welcome-page").hide();
});

// Home page ---> recipent-register

$("#find-button").on("click", function () {

    $(".pickup-form").show();
    $("#welcome-page").hide();
})

// recipient-register---> possible-jobs page



$("#add-recipient-btn").on("click", function() {

    event.preventDefault();
    $(".pickup-form").hide();
    $("#food-table").show();
})

// donor register ---> request received
// populate firebase
// receive from firebase *** incomplete
$(".donor-btn").on("click", function(event) {
    event.preventDefault();


    // hide and show logic
    $(".donor-form").hide();
    $("#request-received").show();

    var newRow = $("<tr>");


    $("#pending-donations").append(newRow);

    // Grabs user input 
    var donor = $("#donor-name-input").val().trim();
    var product = $("#product-input").val().trim();
    var amount = $("#amount-input").val().trim();
    var dateAvailable = $("#date-available-input").val().trim();
    var pickupTime = $("#time-input").val().trim();

    // Creates local "temporary" object for holding donor data 
    var newDonor = {
        name: donor,
        foodProduct: product,
        foodAmount: amount,
        date: dateAvailable,
        time: pickupTime
    };


    // Uploads donor data to the database
    database.ref().push(newDonor);

    // var adaRef = firebase.database().ref('foodfinders-bc');
    // adaRef.remove()
    // .then(function(){
    //     console.log("removed it")
    // })
    // .catch(function(error) {
    //     console.log("Remove failed: " + error.message)
    //   });

    //   database.ref().on("child_added", function(snapshot) {

    // });

    // receive from firebase *** incomplete
    // populate the form *** incomplete

    // log to console
    console.log(newDonor.name);
    console.log(newDonor.foodProduct);
    console.log(newDonor.foodAmount);
    console.log(newDonor.date);
    console.log(newDonor.time);

    // Clears all of the text boxes
    $("#donor-name-input").val("");
    $("#product-input").val("");
    $("#amount-input").val("");
    $("#date-available-input").val("");
    $("#time-input").val("");

});

// Firebase event for adding a row in the html when user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Stores everything into a variable
    var donor = childSnapshot.val().name;
    var product = childSnapshot.val().foodProduct;
    var amount = childSnapshot.val().foodAmount;
    var dateAvailable = childSnapshot.val().date;
    var pickupTime = childSnapshot.val().time;

    // log donor info
    console.log(donor);
    console.log(product);
    console.log(amount);
    console.log(dateAvailable);
    console.log(pickupTime);

    // Create new row in HTML
    var newRow = $("<tr>").append(
        $("<td>").text(donor),
        $("<td>").text(product),
        $("<td>").text(amount),
        $("<td>").text(dateAvailable),
        $("<td>").text(pickupTime),
    );


    var key = childSnapshot.key;

    var newButton = $("<button>");
    newButton.attr("data-key", key);
    newButton.text("Claim!")
    newButton.addClass("claim btn btn-primary");
    newRow.append(newButton);




    // Append the new row to the table
    $("#food-table > tbody").append(newRow);

})




var start = "Denver, CO";
//var end = "Conifer, CO";
var end = "Conifer, CO";

$(document).on("click", ".claim", function() {
    //Claim is a dynamic button, so we must used $(document)
    $(".food-table").hide();
    start = "Denver, CO";
    end = "Conifer, CO";
    $(".map-div").show();


});

$("#exit-btn").on("click", function() {
    $(".map-div").hide();
    $(".food-table").hide();
    $(".donor-form").hide();
    $(".pickup-form").hide();
    $("#request-received").hide();
    $("#welcome-page").show();
});

// dropdown menu for organization type
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
});



// places Api playground
// var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"+ ?location=-33.8670522,151.1957362
//   &radius=500
//   &types=food
//   &name=harbour
//   &key=AIzaSyAzE0So3-6gKzJKPt3D-NAhYTJQhLJZZmc




// adding a reference to the main html page input field to grab the address from 



function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    //var control = document.getElementById('floating-panel');
    //control.style.display = 'block';
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    //var onChangeHandler = function() {

    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //};
    //document.getElementById('start').addEventListener('change', onChangeHandler);
    //document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //var start = document.getElementById('start').value;
    //var end = document.getElementById('end').value;
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}