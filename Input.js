var arrowUp = false;
var arrowDown = false;
var arrowLeft = false;
var arrowRight = false;

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            arrowUp = true;
            break;
        case "ArrowDown":
            arrowDown = true;
            break;
        case "ArrowLeft":
            arrowLeft = true;
            break;
        case "ArrowRight":
            arrowRight = true
            break;
    }
});// keydown

document.addEventListener("keyup", function(event) {
    switch(event.key) {
        case "ArrowUp":
            arrowUp = false;
            break;
        case "ArrowDown":
            arrowDown = false;
            break;
        case "ArrowLeft":
            arrowLeft = false;
            break;
        case "ArrowRight":
            arrowRight = false;
            break;
    }
});// keyup

Game.updateMovement = function() {
    if(arrowUp) player.forward(5);
    if(arrowDown) player.forward(-5);
    if(arrowLeft) player.rotate(Angle.degree(-5));
    if(arrowRight) player.rotate(Angle.degree(5));
};