let jumpKey = false;
let leftkey = false;
let rightKey = false;

window.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "KeyW":
        case "ArrowUp":
            jumpKey = true;
            break;
        case "KeyA":
        case "ArrowLeft":
            leftkey = true;
            break;
        case "KeyD":
        case "ArrowRight":
            rightKey = true;
            break;
    }
}, true);

window.addEventListener("keyup", function(event) {
    switch(event.code) {
        case "KeyW":
        case "ArrowUp":
            jumpkey = false;
            break;
        case "KeyA":
        case "ArrowLeft":
            leftKey = false;
            break;
        case "KeyD":
        case "ArrowRight":
            rightKey = false;
            break;
    }
}, true);
