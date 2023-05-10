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
        //Game.updateSize();
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
            this.tempList[i] = this.renderQueue[i];
        }
        for(let i = index + 1; i < this.renderQueue.length - 1; i++) {
            this.tempList[i] = this.renderQueue[i + 1];
        }

        this.renderQueue = tempList;
    }// removeEntity(index)

    //updateInterval : setInterval(Game.updateScreen(), 1000 / 60)
};// class Game