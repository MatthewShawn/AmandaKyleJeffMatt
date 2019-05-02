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
var start = "";
//var end = "Conifer, CO";
var end = "";
var database = firebase.database();


// Initial hide logic.

$(document).ready(function () {
  $("body").addClass("test");
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();

})

// Home page ---> donor-register

$("#donate-button").on("click", function() {

    $(".donor-form").removeClass("hide");
    $("#welcome-page").addClass('hide');
});

// (KYLE) Donor Form ---> Homepage
$("#back-button").on("click", function(){

  $("#welcome-page").removeClass("hide");
  $(".donor-form").addClass("hide");
  
})
// Home page ---> recipent-register

$("#find-button").on("click", function() {

    $(".pickup-form").removeClass("hide");
    $("#welcome-page").addClass("hide");
})

// (KYLE) Take Me Home Btn ---> Homepage

$("#home-button").on("click", function() {


    $("#welcome-page").removeClass("hide");
    $("#request-received").addClass("hide");
})

// (KYLE) Donate Again ---> Donor Form

$("#again-button").on("click", function() {


    $(".donor-form").removeClass("hide");
    $("#request-received").addClass("hide");
})


// recipient-register---> possible-jobs page



$("#add-recipient-btn").on("click", function() {


  event.preventDefault();
  $(".pickup-form").addClass("hide");
  $("#food-table").removeClass("hide");
  $(".table-title").removeClass("hide");

})

// donor register ---> request received
// populate firebase
// receive from firebase *** incomplete
$(".donor-btn").on("click", function(event) {
    event.preventDefault();


    // hide and show logic
    $(".donor-form").addClass("hide");
    $("#request-received").removeClass("hide");

    // var newRow = $("<tr>");


    // $("#pending-donations").append(newRow);

    // Grabs user input 
    var organization = $("#organization-input").val().trim();
    var address = $(".address-input").val().trim();
    var donor = $("#donor-name-input").val().trim();
    var phone = $("#phone-input").val().trim();
    var product = $("#product-input").val().trim();
    var amount = $("#amount-input").val().trim();
    var dateAvailable = $("#date-available-input").val().trim();
    var pickupTime = $("#pickup-time-input").val().trim();



    // Creates local "temporary" object for holding donor data 
    var newDonor = {
        organization: organization,
        address: address,
        name: donor,
        phone: phone,
        product: product,
        amount: amount,
        dateAvail: dateAvailable,
        pickupTime: pickupTime,
        claimed: false
    };


    // Uploads donor data to the database

    database.ref().push(newDonor);



    // Clears all of the text boxes
    $("#organization-input").val("");
    $(".address-input").val("");
    $("#donor-name-input").val("");
    $("#phone-input").val("");
    $("#product-input").val("");
    $("#amount-input").val("");
    $("#date-available-input").val("");
    $("#pickup-time-input").val("");

});

// Firebase event for adding a row in the html when user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    if (!childSnapshot.val().claimed) {



        // Stores everything into a variable
        var organization = childSnapshot.val().organization;
        var address = childSnapshot.val().address;
        var donor = childSnapshot.val().name;
        var phone = childSnapshot.val().phone;
        var product = childSnapshot.val().product;
        var amount = childSnapshot.val().amount;
        var dateAvailable = childSnapshot.val().dateAvail;
        var pickupTime = childSnapshot.val().pickupTime;


        // Create new row in HTML
        var newRow = $("<tr>").append(
            $("<td>").text(organization),
            $("<td>").text(address),
            $("<td>").text(donor),
            $("<td>").text(phone),
            $("<td>").text(product),
            $("<td>").text(amount),
            $("<td>").text(dateAvailable),
            $("<td>").text(pickupTime),
        );



    var key = childSnapshot.key;
    newRow.data("data-key", key);
    var newButton = $("<button>");
    newButton.attr("data-key", key);
    newButton.text("Claim!")
    newButton.data("data-key", key);
    newButton.addClass("claim waves-effect waves-light btn-large " + key);
    newRow.append(newButton);





        // Append the new row to the table
        $("#food-table > tbody").append(newRow);
    }
})

// var remove = function (e) {
//   console.log("I work");
//   e.preventDefault
//   var key1 = $(this).data("data-key");
//   console.log(key1);
//   // database.ref(key1).remove();
//   $(".food-table").addClass("hide");

//   $(".map-div").removeClass("hide");
// }

var remove = function remove(e) {

    console.log("I work");
    var key = $(this).data("data-key");
    console.log(key);
    // call db update child (key)
    var parent = $("." + key).parent('tr');
    console.log(database.ref(key))

    //    How to access specific child elements in firebase????????
    //    database.ref(key).claimed.set("true");
    console.log(parent);
    parent.remove();
    console.log("Event: " + e);
    start = "Denver, CO";
    end = "Conifer, CO";
    // Clean out the directions and map panels, because we were 
    // getting info stacked in the directions panel.
    $("#right-panel").empty();
    $("#map").empty();
    $(".map-div").removeClass("hide");
    initMap();


}

$(document).on("click", ".claim", remove);

var organizationSelected = "";
var addressSelected = "";
var nameSeleted = "";
var phoneSelected = "";
var productSeleceted = "";
var amountSelected = "";
var pickupDateSelected = "";
var pickupTimeSelected = "";


// Dont remove child, update child where ID equal to "data-key"; update claimed to true


// Grab the selected data points
database.ref().on("child_removed", function(snapshot) {
    organizationSelected = snapshot.organization;
    addressSelected = snapshot.address;
    nameSeleted = snapshot.name;
    phoneSelected = snapshot.phone;
    amountSelected = snapshot.amount;
    pickupDateSelected = snapshot.dateAvail;
    pickupTimeSelected = snapshot.pickupTime;

    console.log(addressSelected);

    start = "Denver, CO";
    end = addressSelected;

    //initMap();

})


// The button that takes you back to the home page 
$("#exit-btn").on("click", function() {
    $(".map-div").addClass("hide");
    $(".food-table").addClass("hide");
    $(".donor-form").addClass("hide");
    $(".pickup-form").addClass("hide");
    $("#request-received").addClass("hide");
    $("#welcome-page").removeClass("hide");
    //The empty statements guarantee that the map page is being re-written.
    //If it fails to re-write, it will be blank the next time we try to 
    //navigate to it.
    $("#right-panel").empty();
    $("#map").empty();
});

// dropdown menu for organization type
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    //var instances = M.Dropdown.init(elems, options);
});


$(document).on("click", ".claim", function() {
    //Claim is a dynamic button, so we must used $(document)
    //   $(".food-table").addClass("hide");


})

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

var placeSearch, autocomplete;

var componentForm = {

    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), { types: ['geocode'] });


  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);


    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log(place);

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({ center: geolocation, radius: position.coords.accuracy });
            autocomplete.setBounds(circle.getBounds());
        });
    }

}



var placeSearch, autocomplete;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), { types: ['geocode'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({ center: geolocation, radius: position.coords.accuracy });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}