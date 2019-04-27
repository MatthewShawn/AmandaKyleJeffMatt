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
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        document.getElementById("login-div").style.display = "none";
        document.getElementById("signedIn-div").style.display = "block";
      } else {
        document.getElementById("signedIn-div").style.display = "none";
          document.getElementById("login-div").style.display = "block";
      }
    });
    
    function login(){
      console.log("Iwork");
  
        var userEmail = $("#email").val().trim();
        var userPassword = $("#password").val().trim();
  
        
  
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
  
          window.alert("Error : "+ errorMessage)
          // ...
        });
    }
    admin.auth().getUserByEmail(email)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully fetched user data:', userRecord.toJSON());
    })
    .catch(function(error) {
     console.log('Error fetching user data:', error);
    });
  