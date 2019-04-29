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

// button for adding donors
$(".donor-btn").on("click", function (event) {
    event.preventDefault();

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

// Create firebase event for adding donor to the database and a row in the html when user adds an entry
database.ref().on("child_added", function (childSnapshot) {
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
        $("<td>").html("<button class='claim-btn'></button>"),
    );

    $(".claim-btn").text("Claim");


    // Append the new row to the table
    $("#food-table > tbody").append(newRow);

})



