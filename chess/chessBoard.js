function startChess() {
  chessBoard.start();
  chessBoard.create();
}

var chessBoard = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  create: function() {
    for (i = 0; i < 8; i++) {
      for (o = 0; o < 8; o++) {
        let white = (i+o % 2 == 0);
        t = new tile(100, 100, white, o, i);
        t.draw();
      }
    }
  }
}

function tile(w, h, white, x, y) {
  this.width = w;
  this.height = h;
  this.x = x;
  this.y = y;
  this.c = 100;
  this.color = "rgb(0, 0, 0)";
  if (white) {
    this.color = "rgb(255, 255, 255)"
  }
  this.draw = function() {
    let newTile = chessBoard.context;
    newTile.fillStyle = this.color;
    newTile.fillRect(this.x * this.c, this.y * this.c, this.width, this.height);
  }
}
