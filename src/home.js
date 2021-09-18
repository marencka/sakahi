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
   document.getElementById('weather-temperature').innerHTML = "The temperature is " + temperature + '&deg;F'; 
   document.getElementById('weather-humidity').innerHTML = "Humidity is " + data.main.humidity + "%"; 
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
     - ${data.author}`; 
   })
 }




 /**
  * GAME
  */
  const statusDisplay = document.querySelector('.game--status');

  let gameActive = true;
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  
  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `It's a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  
  statusDisplay.innerHTML = currentPlayerTurn();
  
  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
  
  function handleCellPlayed(clickedCell, clickedCellIndex) {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.innerHTML = currentPlayer;
  }
  
  function handlePlayerChange() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDisplay.innerHTML = currentPlayerTurn();
  }
  
  function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          let a = gameState[winCondition[0]];
          let b = gameState[winCondition[1]];
          let c = gameState[winCondition[2]];
          if (a === '' || b === '' || c === '') {
              continue;
          }
          if (a === b && b === c) {
              roundWon = true;
              break
          }
      }
  
      if (roundWon) {
          statusDisplay.innerHTML = winningMessage();
          gameActive = false;
          return;
      }
  
      let roundDraw = !gameState.includes("");
      if (roundDraw) {
          statusDisplay.innerHTML = drawMessage();
          gameActive = false;
          return;
      }
  
      handlePlayerChange();
  }
  
  function handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
          return;
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
  }
  
  function handleRestartGame() {
      gameActive = true;
      currentPlayer = "X";
      gameState = ["", "", "", "", "", "", "", "", ""];
      statusDisplay.innerHTML = currentPlayerTurn();
      document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
  }
  
  
  document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
  document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
