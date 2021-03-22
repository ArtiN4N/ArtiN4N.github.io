let canvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.coinInterval = 0;
        this.game = setInterval(game, 20);
    },
    stop : function() {
        clearInterval(this.game);
    }
}

const playerColor = "rgb(118,150,86)";
const screenColor = "rgb(0,0,0)";
const coinColor = "rgb(221,175,12)";
const textColor = "rgba(255,255,255, 0.5)";
