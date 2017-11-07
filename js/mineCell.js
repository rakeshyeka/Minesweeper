function MineCell(x, y) {
  this.x = x;
  this.y = y;
  this.minesAround = 0;
  this.isMine = false;
  this.isTapped = false;
  this.isFlag = false;
  this.domElement = document.createElement("div");
  this.paintMine();
}

MineCell.prototype.paintMine = function(force) {
  if (this.isFlag) {
    this.domElement.className = "flag";
  } else if (!this.isTapped) {
    this.domElement.className = "mine-cell";
  } else if (this.isMine) {
    this.domElement.className = "mine-explode";
  } else if (!force){
    this.domElement.className = "mine-cell-empty";
    if (this.minesAround > 0) {
      var textNode = document.createElement("p");
      textNode.appendChild(document.createTextNode(this.minesAround));
      textNode.className = "text-center mine-count";
      this.domElement.appendChild(textNode);
    }
  }

  if (force && !this.isTapped && !this.isFlag && this.isMine) {
    this.domElement.className = "mine";
  }

  this.domElement.className += " cell-5";
}
