let ply = {
    count: 0,
    enPass: [],
    update: function () {
        this.counter++;
        if (this.counter > 2) {
            let enPassCheck = this.enPass[this.counter - 3];
            if (enPassCheck !== undefined) {
                pList[enPassCheck].enPassant = false;
            }
        }
    },
    rev: function () {
        this.counter--;
        if (this.counter >= 0) {
            let enPassCheck = this.enPass[this.counter];
            if (enPassCheck !== undefined) {
                pList[enPassCheck].enPassant = false;
            }
            this.enPass.pop();
        } else if (this.counter > 1) {
            let enPassCheck = this.enPass[this.counter - 2];
            if (enPassCheck !== undefined) {
                pList[enPassCheck].enPassant = true;
            }
        }
    }
}

let Board = {
    turn: true,
    s: [],
    moves: [],
    nMoves: [],
    curPiece: undefined,
    kings: [],
    makeMove: function (move) {
        let playEP = undefined;

        let piece = pList[Board.s[move.sSquare]];

        if (piece.val === 1 || piece.val === 8) { // Check pawns for en passant
            if (Math.abs(move.sSquare - move.tSquare) === 32) {
                piece.enPassant = true;
                playEP = Board.s[piece.pos];
            }

            let pawnMove = Math.abs(move.sSquare - move.tSquare);
            if (pawnMove === 15 || pawnMove === 17) {
                let factor = -1;
                if (pawnMove === 15) factor = 1;
                if (!Board.turn) factor *= -1;
                captureEnPassant(piece, factor);
            }

            promotion(piece);
        }
        /*if (piece.val === 3 || piece.val === 10) { // Check king for possible castle
            if (move.targetSquare - move.startSquare === 2) { // Castling king side
                let newMove = new Move(piece.pos + 3, piece.pos + 1);
                Board.makeMove(newMove);
                //if (!real) {
                    //Board.unMakeMove(newMove, newCaptured, index);
                //}
            } else if (piece.pos - move.targetSquare === 2) { // Castling queen side
                let newMove = new Move(piece.pos - 4, piece.pos - 1);
                Board.makeMove(newMove);
                //if (!real) {
                    //Board.unMakeMove(newMove, newCaptured, index);
                //}
            }
        }*/
        if (Board.s[move.tSquare] !== undefined) {
            let capturePiece = pList[Board.s[move.tSquare]];

            Board.s[move.tSquare] = undefined; // Remove its index in the board
            if (capturePiece.alive === 0) {
                capturePiece.alive = ply.counter; // Kill piece
            }

        }

        ply.update();

        ply.enPass.push(playEP);

        if (piece.moved === 0) {
            piece.moved = ply.counter; // Piece has moved (for pawn double move, castle)
        }

        Board.s[move.tSquare] = Board.s[move.sSquare]; // Change piece on board
        Board.s[move.sSquare] = undefined;
        piece.pos = move.tSquare; // Change piece position value

        //endGame();

        Board.turn = !Board.turn;
    },
    revMove: function (move) {
        let wasCaptured = undefined;

        for (let i = 0; i < 32; i++) {
            if (pList[i].alive !== 0) {
                if (pList[i].alive + 1 === ply.counter) {
                    pList[i].alive = 0;
                    wasCaptured = pList[i];
                }
            }
            if (pList[i].moved === ply.counter) {
                pList[i].moved = 0;
            }
        }

        let piece = pList[Board.s[move.tSquare]];

        piece.pos = move.sSquare;
        Board.s[move.sSquare] = pList.indexOf(piece);

        if (wasCaptured !== undefined) {
            Board.s[move.tSquare] = pList.indexOf(wasCaptured);
        } else {
            Board.s[move.tSquare] = undefined;
        }

        ply.rev();
    }
};

let pList = [];

class Move {
    constructor (sSquare, tSquare) {
        this.sSquare = sSquare;
        this.tSquare = tSquare;
    }
}

class Piece {
    constructor (value, position) {
        this.val = value;
        this.pos = position;
        this.turn = value < 8;

        this.moved = 0;
        this.alive = 0;
        this.enPassant = false;

        this.source = new Image();
        this.source.src = "images/" + this.val + ".svg";
    }
}

let PieceList = {
    pieces: [],
    length: 0,
    draw: function (ctx) {
        for (let i = 0; i < this.length; i++) {
            let piece = PieceList.pieces[i];
            if (piece.alive === 0) {
                ctx.drawImage(piece.source, (piece.pos & 7) * 100, (piece.pos >> 4) * 100, 100, 100);
            }
        }
    }
};

function generateMoves (looking = false) {
    let nMoves = [];
    for (let i = 0; i < 32; i++) {
        if (pList[i].turn === Board.turn && pList[i].alive === 0) {
            nMoves = nMoves.concat(generatePieceMoves(pList[i], looking));
        }
    }
    return nMoves;
}


HtmlCanvas.canvas.addEventListener("click", function(event) { // Whenever user clicks on the canvas
    let index = 16 * Math.floor(event.pageY / 100) + Math.floor(event.pageX / 100); // turn mouse pos to board pos
    if (Board.curPiece === undefined) { //selecting piece
        if (Board.s[index] !== undefined) {
            if (pList[Board.s[index]].turn === Board.turn) { // selected piece
                Board.curPiece = pList[Board.s[index]];

                let drawMoves = [];
                for (let i = 0; i < Board.moves.length; i++) {
                    if (Board.curPiece.pos === Board.moves[i].sSquare) {
                        drawMoves.push(Board.moves[i].tSquare);
                    }
                }
                drawBoard(drawMoves);
            }
        }
    } else { //piece is selected
        for (let i = 0; i < Board.moves.length; i++) {
            if (Board.curPiece.pos === Board.moves[i].sSquare && index === Board.moves[i].tSquare) {
                Board.makeMove(Board.moves[i])
                Board.moves = generateMoves();
                Board.curPiece = undefined;
                drawBoard();
                break;
            } else if (Board.s[index] !== undefined) {
                if (pList[Board.s[index]].turn === Board.turn) {
                    Board.curPiece = undefined;
                    drawBoard();
                    break;
                }
            }
        }
    }
}, false);

