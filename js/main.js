window.onload = function(e){
  var canvas = document.getElementById("game-canvas");
  var mineGrid = canvas.firstElementChild;
  var myGame = new MineFieldManager();
  myGame.bootStrapGridToCanvas(mineGrid);
  myGame.setMines();
};
