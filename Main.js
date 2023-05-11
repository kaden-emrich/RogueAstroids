Game.updateSize();
Game.ctx.strokeStyle = "#fff";

var ship = new Entity("ship" ,Shapes.ship, Angle.degree(0), new Point(100, 100));
var shipBoundingBox = Entity.fromBody(ship.boundingBox, "box");
//var testEntity = new Entity("test", Shapes.testShape1, Angle.degree(0), new Point(0, 0)); // for debugging

Game.updateInterval = setInterval(function() {
    Game.updateScreen();
}, 1000/60);