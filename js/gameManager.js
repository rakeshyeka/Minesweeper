function GameManager() {
  this.gameOver = false;
  this.won = false;
  this.gameStatusDom = document.getElementById("game-status");
  this.gameStatusDom.addEventListener("click", this.hideGamesState.bind(this));
}

GameManager.prototype.isGameOver = function(mineField) {
  if (this.gameOver) {
    this.showGameState("Game Over!");
    return true;
  }

  if (mineField.tappedCells + mineField.flags == mineField.gridX * mineField.gridY) {
    this.changeGameState(lose = false);
    return true;
  }

  return false;
}

GameManager.prototype.changeGameState = function(lose) {
  this.gameOver = true;
  this.won = !lose;
  var message = lose ? "Game Over!" : "You Win!";
  this.showGameState(message);
}

GameManager.prototype.showGameState = function(message) {
  this.gameStatusDom.style.display = "block";
  this.gameStatusDom.innerHTML = "<p class=\"game-status\">" + message + "</p>"
}

GameManager.prototype.hideGamesState = function() {
  this.gameStatusDom.style.display = "none";
}
