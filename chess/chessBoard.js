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
