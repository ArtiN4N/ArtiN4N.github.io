function endGame(fiftyMove = false) {
    if (Board.moves.length === 0) {
        if (checked()) {
            console.log("checkmate");
        } else {
            console.log("stalemate");
        }
    } else if (fiftyMove) {
        console.log("draw");
    }
}
