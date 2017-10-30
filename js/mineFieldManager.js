function MineFieldManager() {
  this.gridX = 8;
  this.gridY = 8;
  this.mineCount = 10;
  this.grid = [];

  this.initGrid();
}

MineFieldManager.prototype.initGrid = function () {
  for (var i=0; i < this.gridX; i++) {
    var row = [];
    for (var j=0; j < this.gridY; j++) {
      var cell = new MineCell(i, j);
      row.push(cell);
    }
    this.grid.push(row);
  }
};

MineFieldManager.prototype.bootStrapGridToCanvas = function (canvas) {
  for (var i=0; i < this.gridX; i++) {
    var row = document.createElement("div");
    row.className = "mine-row";
    canvas.appendChild(row);
    for (var j=0; j< this.gridY; j++) {
      row.appendChild(this.grid[i][j].domElement);
    }
  }
}

MineFieldManager.prototype.setMines = function() {
  var i = 0;
  while(i < this.mineCount) {
    var x = generateRandomNum(0, this.gridX);
    var y = generateRandomNum(0, this.gridY);
    console.log(x,y);
    if (!this.grid[x][y].isMine) {
      i++;
      this.grid[x][y].isMine = true;
      updateMinesAround(x, y, this);
    }
  }
}

MineFieldManager.prototype.showField = function(force) {
  for (var i=0; i < this.gridX; i++) {
    for (var j=0; j< this.gridY; j++) {
      this.grid[i][j].paintMine(force);
    }
  }
}

var updateMinesAround = function(x, y, mineField) {
  for (var i=-1; i < 2; i++) {
    for (var j=-1; j < 2; j++) {
      var row = x + i;
      var col = y + j;
      if ((row >= 0 && row < mineField.gridX)
          && (col >= 0 && col < mineField.gridY)) {
        mineField.grid[row][col].minesAround++;
      }
    }
  }
}

var generateRandomNum = function(a, b) {
  return Math.floor(Math.random()*(b-a) + a);
}
