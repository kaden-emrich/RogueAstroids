Game.updateSize();
Game.ctx.strokeStyle = "#fff";

var ship = new Entity("ship" ,Shapes.ship, Angle.degree(0), new Point(100, 100));

setInterval(function() {
    Game.updateScreen();
}, 1000/60);