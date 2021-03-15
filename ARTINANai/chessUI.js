let playColor = true

function clickOption(color = true) {
    playColor = color;

    let colors = ["white", "black"];
    let i = 0;
    if (!playColor) i = 1;

    document.getElementById(colors[i]).style.opacity= "1";
    document.getElementById(colors[1-i]).style.opacity= "0.5";

    document.getElementById("times").style.visibility= "visible";
}

function clickTime(time) {
    document.getElementById("titleScreen").parentNode.removeChild(document.getElementById("titleScreen"))
    initGame(playColor, time);
}
