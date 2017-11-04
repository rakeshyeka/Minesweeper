function InputManager(gameManager) {
  this.gameManager = gameManager;
}

InputManager.prototype.plantFlag = function(mineField, x, y) {
  if (this.gameManager.gameOver) {
    return;
  }

  var mineCell = mineField.grid[x][y];
  if (mineCell.isTapped) {
    return;
  }

  mineCell.isFlag = !mineCell.isFlag;
  if (mineCell.isFlag) {
    mineField.flags++;
  } else {
    mineField.flags--;
  }

  mineCell.paintMine();
  this.gameManager.isGameOver(mineField);
}

InputManager.prototype.cascadeTap = function(mineField, x, y) {
  if (this.gameManager.gameOver) {
    return;
  }

  var mineCell = mineField.grid[x][y];
  if (mineCell.isTapped || mineCell.isFlag) {
    return;
  }

  mineCell.isTapped = true;
  mineField.tappedCells++;
  mineCell.paintMine();

  if (mineCell.isMine) {
    this.gameManager.changeGameState(lose = true);
    return;
  } else if ( mineCell.minesAround > 0) {
    this.gameManager.isGameOver(mineField);
    return;
  } else {
    for (let i=-1; i < 2; i++) {
      for (let j=-1; j < 2; j++) {
        let p = x + i;
        let q = y + j;
        if (p >= 0  && p < mineField.gridX && q >= 0 && q < mineField.gridY) {
          this.cascadeTap(mineField, p, q);
        }
      }
    }
  }
}
