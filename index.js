let currentPlayer = 1;
let currentScore = 0;
let scoreTracker = [0, 0];
let gameActive = true;

$("#roll").click(rollDice);
$("#hold").click(holdScore);
$("#new").click(newGame);
$("#start").click(startGame);

function startGame() {
  //start the game
  $("#howToPlay").hide();
  $("#message").text = "Player 1's turn";
}

function newGame() {
  //restart the game
  currentPlayer = 1;
  currentScore = 0;
  scoreTracker = [0, 0];
  gameActive = true;
  $("#player1-score").text(0);
  $("#player2-score").text(0);
  $("#player1-total").text(0);
  $("#player2-total").text(0);
  $("#message").text("New Game! Player 1's turn");
}

function checkFor1(num) {
  //Check for dice 1
  if (num === 1) {
    currentScore = 0;
    switchPlayer();
  } else {
    currentScore += num;
    $(`#player${currentPlayer}-score`).text(currentScore);
  }
}

function rollDice() {
  //Randomize dice's score
  if (gameActive) {
    const num = Math.ceil(Math.random() * 6);
    $("#dice_image").attr("src", `images/dice${num}.png`);
    checkFor1(num);
  }
}

function checkForWinning() {
  //check if score is greater than 100
  if (scoreTracker[currentPlayer - 1] >= 100) {
    $("#message").text(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else {
    switchPlayer();
  }
}

function holdScore() {
  //update players' total score
  if (gameActive) {
    scoreTracker[currentPlayer - 1] += currentScore;
    $(`#player${currentPlayer}-total`).text(scoreTracker[currentPlayer - 1]);
    checkForWinning();
  }
}

function switchPlayer() {
  //switch player
  $(`#player${currentPlayer}-score`).text(0);
  currentScore = 0;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  $("#message").text(`Player ${currentPlayer}'s turn`);
}
