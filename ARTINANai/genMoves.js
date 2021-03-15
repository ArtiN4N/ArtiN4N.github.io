function generatePieceMoves (piece, lookForCheck) {
    const knightMoves = [-33, -31, -18, -14, 33, 31, 18, 14];
    const bishopMoves = [-17, -15, 15, 17];
    const rookMoves = [-16, -1, 1, 16];

    const pawnIsOccupied = [-1, 1, 15, 17];

    let pieceMoves = []; // Array of all piece moves unaffected by checks

    let value = piece.val;
    if (!Board.turn) value -= 7; // Revert black pieces to white values

    if ((value & 4) !== 0) {
        for (let i = 0; i < 4; i++) {
            for (let o = 0; o < 2; o++) {
                let breaking = false; // Capturing enemy pieces
                let addMoveSet = [];
                if (((value & 1) !== 0) && ((value & 2) !== 0)) {
                    if ((value & 1) !== 0 && o === 0) {
                        addMoveSet = bishopMoves;
                    } else if ((value & 2) !== 0 && o === 1) {
                        addMoveSet = rookMoves;
                    }
                } else {
                    if ((value & 1) !== 0 && o === 0) {
                        addMoveSet = bishopMoves;
                    } else if ((value & 2) !== 0 && o === 0) {
                        addMoveSet = rookMoves;
                    } else {
                        break;
                    }
                }
                let addNewMove = addMoveSet[i];
                while (((piece.pos + addNewMove) & 0x88) === 0) { // &'ing with 0x88 (not writing this in binary) detects if on board
                    if (breaking) break;

                    if (Board.s[piece.pos + addNewMove] !== undefined) { // Piece on Board
                        let contestingPiece = pList[Board.s[piece.pos + addNewMove]];
                        if (contestingPiece.turn === piece.turn)  { // Looking at a friendly piece, break
                            break;
                        } else { // Looking at an enemy piece, pierce once, then break the next turn
                            breaking = true;
                        }
                    }

                    pieceMoves.push(new Move(piece.pos, piece.pos + addNewMove)); // Add target
                    addNewMove += addMoveSet[i]; // Increase base move (sliding)
                }
            }
        }
    } else { // Not sliding
        if (value === 1) { // Pawn

            let factor = 1;
            if (piece.turn) factor = -1; // Up or down the Board

            if (Board.s[piece.pos + 16 * factor] === undefined) { // Single move
                pieceMoves.push(new Move(piece.pos, piece.pos + 16 * factor));
                if (piece.moved === 0 && Board.s[piece.pos + 32 * factor] === undefined) { // Double move
                    pieceMoves.push(new Move(piece.pos, piece.pos + 32 * factor));
                }
            }

            for (let i = 0; i < pawnIsOccupied.length; i++) { // Check every possible pawn take (-1 EP, +1 EP, +15, +17)
                if (Board.s[piece.pos + pawnIsOccupied[i] * factor] !== undefined) {
                    let contestingPiece = pList[Board.s[piece.pos + pawnIsOccupied[i] * factor]];

                    if (contestingPiece.turn !== piece.turn) {
                        if (i < 2) {
                            if (contestingPiece.enPassant) {
                                if (pawnIsOccupied[i] === -1) {
                                    pieceMoves.push(new Move(piece.pos, piece.pos + pawnIsOccupied[2] * factor));
                                } else {
                                    pieceMoves.push(new Move(piece.pos, piece.pos + pawnIsOccupied[3] * factor));
                                }
                            }
                        } else {
                            pieceMoves.push(new Move(piece.pos, piece.pos + pawnIsOccupied[i] * factor));
                        }
                    }
                }
            }

        } else if (value === 2){ // Knight
            for (let i = 0; i < 8; i++) { // 8 knight moves
                if ((piece.pos + knightMoves[i] & 0x88) === 0) {
                    let contestingSquare = Board.s[piece.pos + knightMoves[i]];
                    if (contestingSquare === undefined ) {
                        pieceMoves.push(new Move(piece.pos, piece.pos + knightMoves[i]));
                    }
                    else if (piece.turn !== pList[contestingSquare].turn) {
                        pieceMoves.push(new Move(piece.pos, piece.pos + knightMoves[i]));
                    }
                }
            }
        } else { // King movement
            for (let i = 0; i < 4; i++) { // 4 moves per sliding piece

                let addNewMoves = [];

                if (((piece.pos + rookMoves[i]) & 0x88) === 0) {
                    if (Board.s)
                    addNewMoves.push(rookMoves[i]);
                }
                if (((piece.pos + bishopMoves[i]) & 0x88) === 0) {
                    addNewMoves.push(bishopMoves[i]);
                }

                for (let i = 0; i < addNewMoves.length; i++) {
                    if (Board.s[piece.pos + addNewMoves[i]] !== undefined) {
                        let contestingPiece = pList[Board.s[piece.pos + addNewMoves[i]]];
                        if (piece.turn !== contestingPiece.turn) {
                            pieceMoves.push(new Move(piece.pos, piece.pos + addNewMoves[i]));
                        }
                    } else { // Empty square
                        pieceMoves.push(new Move(piece.pos, piece.pos + addNewMoves[i]));
                    }
                }
            }

            if (piece.moved === 0) {
                if (Board.s[piece.pos - 4] !== undefined) {
                    if (pList[Board.s[piece.pos - 4]].moved === 0) {
                        if (Board.s[piece.pos - 3] === undefined && Board.s[piece.pos - 2] === undefined && Board.s[piece.pos - 1] === undefined) {
                            pieceMoves.push(new Move(piece.pos, piece.pos - 2));
                        }
                    }
                }
                if (Board.s[piece.pos + 3] !== undefined) {
                    if (pList[Board.s[piece.pos + 3]].moved === 0) {
                        if (Board.s[piece.pos + 2] === undefined && Board.s[piece.pos + 1] === undefined) {
                            pieceMoves.push(new Move(piece.pos, piece.pos + 2));
                        }
                    }
                }
            }
        }
    }
    pieceMoves = legalPieceMoves(pieceMoves, lookForCheck);
    return pieceMoves;
}

function legalPieceMoves(moves, lookForCheck) {
    let lMoves = []

    for (let i = 0; i < moves.length; i++) {
        Board.makeMove(moves[i]);
        Board.turn = !Board.turn;
        //if (!lookForCheck) {
            //if (!checked()) lMoves.push(moves[i]);
        //} else {
            lMoves.push(moves[i]);
        //}
        Board.revMove(moves[i]);
    }

    return lMoves
}

function checked() {

    let kingIndex = 0;
    if (!Board.turn) kingIndex = 1;
    let returnValue = false;

    Board.turn = !Board.turn;
    let possibleMoves = generateMoves(true);
    Board.turn = !Board.turn;

    for (let i = 0; i < possibleMoves.length; i++) {
        let contestingSquare = pList[Board.s[possibleMoves[i].targetSquare]];
        if (contestingSquare === Board.kings[kingIndex]) { // Check to see if enemy is targeting the king
            returnValue = true;
        }
    }
    return returnValue;
}

function captureEnPassant (piece, factor) {
    if (Board.s[piece.pos + factor] !== undefined) {
        let enPassPiece = pList[Board.s[piece.pos + factor]];
        if (enPassPiece.enPassant) {
            Board.s[enPassPiece.pos] = undefined; // Remove its index in the board
            if (enPassPiece.alive === 0) {
                enPassPiece.alive = ply.counter; // Kill piece
            }
        }
    }
}

function promotion (piece) {
    if ((Board.turn && (piece.pos >> 4) === 1) || (!Board.turn && (piece.pos >> 4) === 8)) {
        (piece.val === 1) ? piece.val = 7 : piece.val = 14;
        piece.source.src = "images/" + piece.val + ".svg";
    }
}
