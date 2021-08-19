
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


document.getElementById('signUp').addEventListener('click', signUpUser);
document.getElementById('logoutBtn').addEventListener('click', logOutUser);
document.getElementById('loginBtn').addEventListener('click', logInUser);


document.getElementById('loginScreen').style.display = "block";
document.getElementById('dashboard').style.display = "none";

// create new user
function signUpUser() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}


function logInUser() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;


  firebase.auth().signInWithEmailAndPassword(email, password).catch(e => {
    console.log(e);
  })
}

function logOutUser() {
  firebase.auth().signOut().then(() => {
    document.getElementById('loginScreen').style.display = "block";
    document.getElementById('dashboard').style.display = "none";
  }).catch(e => {
    console.log(e);
  })
}

function showUserDetails(user) {
  document.getElementById('userDetails').innerHTML = `
      <p>Logged In Successfully with ${user.email}</p>`
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user);
    document.getElementById('loginScreen').style.display = "none";
    document.getElementById('dashboard').style.display = "block";
    showUserDetails(user);
  } else {
    document.getElementById('loginScreen').style.display = "block";
    document.getElementById('dashboard').style.display = "none";
  }
})
