var size = 800;

function startChess() {
  chessBoard.start();
  chessBoard.draw();
}

var chessBoard = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = size;
    this.canvas.height = size;
    this.context = this.canvas.getContext("2d");
    this.game = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  draw: function() {
    for (i = 0; i < 8; i++) {
      for (o = 0; o < 8; o++) {
        if ((i+o) % 2 != 0) {
          chessBoard.context.fillStyle = "rgb(0, 0, 0)";
          chessBoard.context.fillRect(o * (size/8), i * (size/8), (size/8), (size/8));
        }
      }
    }
    
    p = new Piece(1, 66);
    p.draw();
  }
}
class Piece {
  constructor(value, loc) {
    this.source = new Image();
    this.source.src = 'Pieces.png';

    this.piece_value = value;
    this.piece_location = loc;
  }
  
  
  draw() {
    let newTile = chessBoard.context;
    let newLoc = (this.piece_location + (this.piece_location & 7)) >> 1;
    console.log(newLoc);
    newTile.drawImage(this.source, 4 * 333.33, 4 * 333.33, 333.33, 333.33, 4 * (size/8), 4 * (size/8), (size/8), (size/8));
  }
}
/*
function piece(x, y, color, iX, iY) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.source = new Image();
  this.source.src = 'Pieces.png';
  this.c = (size/8);
  this.spriteCX = 333.33;
  this.spriteCY = 333.33;
  this.indexX = iX;
  this.indexY = iY;
  
  
  this.draw = function() {
    alert("yo");
    let newTile = chessBoard.context;
    newTile.drawImage(this.source, this.indexX * this.spriteCX, this.indexY * this.spriteCY, this.spriteCX, this.spriteCY, this.x * this.c, this.y * this.c, (size/8), (size/8));
  }
}
*/
