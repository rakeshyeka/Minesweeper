window.onload = function(e){
  var canvas = document.getElementById("game-canvas");
  var mineGrid = canvas.firstElementChild;
  var gameManager = new GameManager();
  var inputManager = new InputManager(gameManager);
  var myGame = new MineFieldManager(inputManager);
  myGame.bootStrapGridToCanvas(mineGrid);
  myGame.setMines();
};
