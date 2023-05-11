var Game = {
    canvas : document.getElementById("game"),
    ctx : document.getElementById("game").getContext("2d"),
    renderQueue : [],

    get width() {
        return this.canvas.width;
    },// width

    get height() {
        return this.canvas.height;
    },// height

    updateSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.height = window.innerHeight;
        this.canvas.style.height = window.innerHeight + "px";
    },// updateSize()
    
    updateScreen() {
        //if(this.updateSize != null) this.updateSize();
        if(this.updateMovement != null) this.updateMovement();
        if(this.updateCollision != null) this.updateCollision();

        this.ctx.clearRect(0, 0, this.width, this.height);
        
        for(let i = 0; i < this.renderQueue.length; i++) {
            this.renderQueue[i].draw();
        }
        //console.log("Screen updated"); // for debugging
    },// update

    addEntity(e) {
        var index = this.renderQueue.length;
        this.renderQueue[this.renderQueue.length] = e;
        return index;
    },// update

    removeEntity(index) {
        var tempList = [];

        for(let i = 0; i < index; i++) {
            tempList[i] = this.renderQueue[i];
        }
        for(let i = index; i < this.renderQueue.length - 1; i++) {
            tempList[i] = this.renderQueue[i + 1];
        }

        this.renderQueue = tempList;
    },// removeEntity(index)

    //updateInterval : setInterval(Game.updateScreen(), 1000 / 60)

    updateInterval : setInterval(function() {
        Game.updateScreen();
    }, 1000/60)// updateInterval()
};// class Game

/*-----------------------------------*/

Game.updateSize();
Game.ctx.strokeStyle = "#fff";
Game.ctx.lineWidth = 4;

var player = new Entity("player", Shapes.ship, Angle.degree(0), new Point(100, 100), Game.ctx);
var playerBox = Entity.fromBody(player.boundingBox, "box");
var testEntity = new Entity("test", Shapes.testShape, Angle.degree(0), new Point(300, 300), Game.ctx);

//*
Game.updateCollision = function() {
    playerBox.kill();
    playerBox = Entity.fromBody(player.boundingBox, "box");
    if(player.isTouching(testEntity)) {
        player.color = "#f00";
    }
    else {
        player.color = "#fff";
    }
}// Game.updateCollision()*/