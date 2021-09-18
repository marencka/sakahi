/**
 * FIREBASE CONFIGURATION
 */
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCaN3gUujQF9nYZWeQlOadTDq7SzkSvPuU",
  authDomain: "sakahi.firebaseapp.com",
  databaseURL: "https://sakahi-default-rtdb.firebaseio.com",
  projectId: "sakahi",
  storageBucket: "sakahi.appspot.com",
  messagingSenderId: "421717937827",
  appId: "1:421717937827:web:3bb65868a57e37b5283916"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Tracking HTML elements 
document.getElementById('loginBtn').addEventListener('click', loginUser);
document.getElementById('signupBtn').addEventListener('click', signUp);

// Lets a user login
function loginUser() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(e => {
    console.log(e);
  })
}

// Signs up a user
function signUp() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

// Confirmation screen
function showUserDetails(user) {
  document.getElementById('userDetails').innerHTML = `
      <p>Logged in successfully with ${user.email}</p>
      `
}

// Logs a user out
function logout() {
  firebase.auth().signOut().then(() => {
    window.location = "index.html";
  }).catch(e => {
    console.log(e);
  })
}

// On Auth State Change
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log(user)
    // document.getElementById('loginScreen').style.display = 'none';
    // document.getElementById('dashboard').style.display = 'block';
    // showUserDetails(user);
    window.location = 'home.html';
  } else {
    document.getElementById('loginScreen').style.display = 'block';
  }
})




