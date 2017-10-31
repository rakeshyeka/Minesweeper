function MineCell(x, y) {
  this.x = x;
  this.y = y;
  this.minesAround = 0;
  this.isMine = false;
  this.isTapped = false;
  this.domElement = document.createElement("div");
  this.paintMine();
}

MineCell.prototype.paintMine = function(force) {
  if (!this.isTapped) {
    this.domElement.className = "mine-cell cell-5";
  } else if (this.isMine) {
    this.domElement.className = "mine-explode cell-5";
  } else {
    this.domElement.className = "mine-cell-empty cell-5";
    if (this.minesAround > 0) {
      var textNode = document.createElement("p");
      textNode.appendChild(document.createTextNode(this.minesAround));
      textNode.className = "text-center mine-count";
      this.domElement.appendChild(textNode);
    }
  }

  if (force && !this.isTapped && this.isMine) {
    this.domElement.className = "mine cell-5";
  }
}
