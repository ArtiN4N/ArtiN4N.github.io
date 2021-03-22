window.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
            yVel = 10.0;
            break;
        case "KeyW":
        case "ArrowUp":
            yVel = -10.0;
            break;
        case "KeyA":
        case "ArrowLeft":
            xVel = -10.0;
            break;
        case "KeyD":
        case "ArrowRight":
            xVel = 10.0;
            break;
    }
}, true);

window.addEventListener("keyup", function(event) {
    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
        case "KeyW":
        case "ArrowUp":
            yVel = 0.0;
            break;
        case "KeyA":
        case "ArrowLeft":
        case "KeyD":
        case "ArrowRight":
            xVel = 0.0;
            break;
    }
}, true);
