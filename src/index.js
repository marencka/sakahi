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
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('signupBtn').addEventListener('click', signUp);

document.getElementById('loginScreen').style.display = 'block';
document.getElementById('dashboard').style.display = 'none';

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
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
  }).catch(e => {
    console.log(e);
  })
}

// On Auth State Change
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user)
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    showUserDetails(user);
  } else {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
  }
})




/** Functions for retrieving weather from OpenWeatherMap API 
 * and then calling the drawWeather to inject data into HTML
 * 
 */
document.getElementById('loginBtn').addEventListener('click', weatherBalloon);

function weatherBalloon() {
    let zip = 27514;
  var key = '50dcc5dbf34a26daf6b61f767cacc098';
  fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial&appid=' + key)
    .then(function (resp) {
      return resp.json()
    }).then(function (data) {
      drawWeather(data); 
    })
    .catch(function () {
      // catch errors
    });
}

function drawWeather(data) {
  let temperature = data.main.temp; 
  document.getElementById('weather-conditions').innerHTML = "The weather is currently described as: " + data.weather[0].description; 
  document.getElementById('weather-temperature').innerHTML = "The temperature is currently " + temperature + '&deg;F'; 
  document.getElementById('weather-humidity').innerHTML = "The humidity is " + data.main.humidity + "%"; 
}


/**
 * NEWS API
 */
document.getElementById('loginBtn').addEventListener('click', newsprint); 

function newsprint() {
  var key = '5c678ac4e7854de6bc7439d2582f2f0b';
  fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + key)
  .then(function (resp) {
    return resp.json()
  }).then(function (data) {
    newsPopulate(data);
  }).catch(e => {
    console.log(e); 
  })
}

function newsPopulate(data) {

  console.log(data); 
  document.getElementById('news-1').innerHTML = data.articles[0].description; 
  document.getElementById('news-2').innerHTML = data.articles[1].description; 
  document.getElementById('news-3').innerHTML = data.articles[2].description; 

  let newsLink = document.getElementById('news-1-link'); 
  newsLink.setAttribute('href', data.articles[0].url);
}