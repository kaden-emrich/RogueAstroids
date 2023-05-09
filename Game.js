var Game = {
    canvas : document.getElementById("game"),
    ctx : document.getElementById("game").getContext("2d"),

    updateSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.height = window.innerHeight;
        this.canvas.style.height = window.innerHeight + "px";
    }// updateSize()
}// class Game