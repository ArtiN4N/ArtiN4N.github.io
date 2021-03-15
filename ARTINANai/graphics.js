let HtmlCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
};

function initGame (color, time) {
    HtmlCanvas.start();
    let order = [6, 2, 5, 7, 3, 5, 2, 6]; // Non pawns
    for (let i = 0; i < 32; i++) { // Setup board
        if (i < 8) {
            Board.s[i] = i; // Board at index equals new piece's index
            pList.push(new Piece(order[i]+7, i));
        } else if (i < 16) {
            pList.push(new Piece(8, 8 + i));
            Board.s[8 + i] = i;
        } else if (i < 24) {
            pList.push(new Piece(order[i - 16], 96 + i));
            Board.s[96 + i] = i;
        } else {
            pList.push(new Piece(1, 72 + i));
            Board.s[72 + i] = i;
        }
        if (pList[i].val === 3 || pList[i].val === 10) {
            Board.kings.push(i);
        }
    }
    drawBoard();

    let ctx = HtmlCanvas.context;
    for (let i = 0; i < 32; i++) {
        pList[i].source.onload = function() { // Startup drawing
            ctx.drawImage(pList[i].source, (pList[i].pos & 7) * 100, (pList[i].pos >> 4) * 100, 100, 100);
        }
    }

    // moves
    Board.moves = generateMoves();

    // nMoves

}

function drawBoard (mList = []) {
    let ctx = HtmlCanvas.context;

    for (let i = 0; i < 8; i++) { // Drawing Board tiles
        for (let o = 0; o < 8; o++) {
            let color = "rgb(118,150,86)";
            if ((i + o) % 2 === 0) {
                color = "rgb(238,238,210)";
            }
            ctx.fillStyle = color;
            ctx.fillRect(o * 100, i * 100, 100, 100);
        }
    }

    for (let i = 0; i < 32; i++) {
        if (pList[i].alive === 0) {
            ctx.drawImage(pList[i].source, (pList[i].pos & 7) * 100, (pList[i].pos >> 4) * 100, 100, 100);
        }
    }

    if (Board.curPiece !== undefined) { // Current piece
        ctx.fillStyle = "rgba(26,143,179, 0.5)";
        ctx.fillRect((Board.curPiece.pos & 7) * 100, (Board.curPiece.pos >> 4) * 100, 100, 100);
    }

    for (let i = 0; i < mList.length; i++) { // Current piece moves
        ctx.fillStyle = "rgba(183,40,40, 0.5)";
        ctx.fillRect((mList[i] & 7) * 100, (mList[i] >> 4) * 100, 100, 100);
    }
}
