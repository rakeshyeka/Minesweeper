function MineFieldManager(inputManager) {
  this.gridX = 8;
  this.gridY = 8;
  this.mineCount = 10;
  this.flags = 0;
  this.tappedCells = 0;
  this.grid = [];
  this.inputManager = inputManager;

  this.initGrid();
}

MineFieldManager.prototype.initGrid = function () {
  for (let i=0; i < this.gridX; i++) {
    let row = [];
    for (let j=0; j < this.gridY; j++) {
      let cell = new MineCell(i, j);
      cell.domElement.addEventListener('click', function(){
        this.inputManager.cascadeTap(this, i, j);
      }.bind(this));
      cell.domElement.addEventListener('contextmenu', function(ev){
        ev.preventDefault();
        this.inputManager.plantFlag(this, i, j);
        return false;
      }.bind(this));
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
      updateMinesAround(this, x, y);
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

var updateMinesAround = function(mineField, x, y) {
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
