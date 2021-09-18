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

document.getElementById('logoutBtn').addEventListener('click', logout);


// Logs a user out
function logout() {
  firebase.auth().signOut().then(() => {
    window.location = "index.html";
  }).catch(e => {
    console.log(e);
  })
}


/** Functions for retrieving weather from OpenWeatherMap API 
 * and then calling the drawWeather to inject data into HTML
 * 
 */

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

 function hotnews() {
   var key = "07uktKF5wGTekDWUNdB6VDIceetWDb38"; 
   fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + key)
   .then(function (resp) {
     return resp.json()
   }).then(function (data) {
     printNews(data); 
   }).catch(function (e) {
     console.log(e); 
   });
 }

 function printNews(data) {
   document.getElementById('news0').innerHTML = data.results[0].title;
   document.getElementById('news1').innerHTML = data.results[1].title;
   document.getElementById('news2').innerHTML = data.results[2].title;

  for (let i = 0; i < 3; i++) { 
    let a = document.getElementById('news' + i + 'Link'); 
    a.href = data.results[i].url; 
  }
 }

 /** 
  * QUOTE API
  */
 function quote() {
   fetch('https://api.quotable.io/random')
   .then(response => response.json()) 
   .then(data => {
     document.getElementById('quoteMessage').innerHTML = `${data.content}
     -${data.author}`; 
   })
 }




 /**
  * GAME
  */
  const X_CLASS = 'x'
  const CIRCLE_CLASS = 'circle'
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const cellElements = document.querySelectorAll('[data-cell]')
  const board = document.getElementById('board')
  const winningMessageElement = document.getElementById('winningMessage')
  const restartButton = document.getElementById('restartButton')
  const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
  let circleTurn
  
  startGame()
  
  restartButton.addEventListener('click', startGame)
  
  function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
  }
  
  function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
      swapTurns()
      setBoardHoverClass()
    }
  }
  
  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }
  
  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  }
  
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
  }
  
  function swapTurns() {
    circleTurn = !circleTurn
  }
  
  function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
    } else {
      board.classList.add(X_CLASS)
    }
  }
  
  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }