Game.updateSize();
Game.ctx.strokeStyle = "#fff";

var shipPoints = [
    new Point(30, 0),
    new Point(-10, 15),
    new Point(-10, -15)
];

var ship = new Shape(shipPoints);

function test() { // IT WORKS!!!
    ship.draw(100, 100, Angle.degree(-45));
}// test()

test();