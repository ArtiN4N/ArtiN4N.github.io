var size = 800;

function startChess() {
  chessBoard.start();
}

var chessBoard = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = size;
    this.canvas.height = size;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    for (i = 0; i < 8; i++) {
      for (o = 0; o < 8; o++) {
        if ((i+o) % 2 != 0) {
          t = new tile(o, i);
          t.draw();
          p = new piece(0, 0, true, 0, 0);
        }
      }
    }
  }
}

function tile(x, y) {
  this.x = x;
  this.y = y;
  this.c = (size/8);
  this.draw = function() {
    let newTile = chessBoard.context;
    newTile.fillStyle = "rgb(0, 0, 0)";
    newTile.fillRect(this.x * this.c, this.y * this.c, (size/8), (size/8));
  }
}

function piece(x, y, color, iX, iY) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.source = new Image();
  this.source.src = 'Pieces.png'
  this.c = (size/8);
  this.spriteCX = 333.33;
  this.spriteCY = 333.33;
  this.indexX = iX;
  this.indexY = iY;
  
  
  this.draw = function() {
    let newTile = chessBoard.context;
    newTile.drawImage(this.source, this.indexX * this.spriteCX, this.indexY * this.spriteCY, this.spriteCX, this.spriteCY, this.x * this.c, this.y * this.c, (size/8), (size/8));
  }
}

