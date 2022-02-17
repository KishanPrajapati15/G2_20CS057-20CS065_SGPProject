// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCAu7U-ufoHWMwvC8XMOP4y4GJang58aHo",
  authDomain: "index-page-c61ed.firebaseapp.com",
  projectId: "index-page-c61ed",
  storageBucket: "index-page-c61ed.appspot.com",
  messagingSenderId: "422943261306",
  appId: "1:422943261306:web:931c40ad4f4089bb6f31c3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  mobile_number = document.getElementById('mobile_number').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password maybe incorrect.')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(mobile_number) == false) {
    alert('One or More Extra Fields maybe incorrect.')
    return
  }

  // Move on with Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser
      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        mobile_number: mobile_number,
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // data saved
      alert('User Created!!')
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

//login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password maybe incorrect!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // DOne
      alert('User Logged In!!')
      window.location = "Page2SelectOption.html";
      // document.write("Please wait... directing to another page");
      // setTimeout('myfunction()',2000);

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })

}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // password should be greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}