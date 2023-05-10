// Kaden Emrich

class Angle {
    static radianstoDegrees(radians) {
        return radians * 180 / Math.PI;
    }// getDegrees(radians)

    static degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }// getRadians(degrees)

    static degree(degrees) {
        return new this(Angle.degreesToRadians(degrees));
    }// degrees(degrees)

    static radian(radians) {
        return new this(radians);
    }// newRadian(radians)

    constructor(radians) {
        this.rad = radians;
        this.deg = Angle.radianstoDegrees(this.rad);
    }// constructor(radians)

    
}// class Angle

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }// constructor(x, y)

    getPolar() {
        var r = Math.sqrt((this.x*this.x) + (this.y*this.y));
        var dir;
        if(this.x > 0)
            dir = Angle.radian(Math.atan(this.y / this.x));
        else {
            dir = Angle.radian(Math.atan(this.y / this.x) + Math.PI);
        }

        return new PolarCoordinate(r, dir);
    }// getPolar()
}// class Point

class PolarCoordinate {
    constructor(r, dir) {
        this.r = r;
        this.dir = dir;
    }// constructor(r, dir)

    getPoint() {
        var x = this.r * Math.cos(this.dir.rad);
        var y = this.r * Math.sin(this.dir.rad);
        return new Point(x, y);
    }// getPoint()
}// class PolarCoordinate

class Line {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }// constructor(point1, point2)
}// class Line

class Shape {
    constructor(points) {
        this.points = points;
    }// constructor(points)

    draw(point, direction) {
        Game.ctx.beginPath();
        let pCoordinate = new PolarCoordinate(this.points[0].getPolar().r, Angle.degree(this.points[0].getPolar().dir.deg + direction.deg));
        let xpos = pCoordinate.getPoint().x + point.x;
        let ypos = pCoordinate.getPoint().y + point.y;
        Game.ctx.moveTo(xpos, ypos);

        for(let i = 1; i < this.points.length; i++) {
            pCoordinate = new PolarCoordinate(this.points[i].getPolar().r, Angle.degree(this.points[i].getPolar().dir.deg + direction.deg));
            xpos = pCoordinate.getPoint().x + point.x;
            ypos = pCoordinate.getPoint().y + point.y;
            Game.ctx.lineTo(xpos, ypos);
        }

        Game.ctx.closePath();
        Game.ctx.stroke();
    }// draw(point, direction)
}// class Shape

class Body {
    constructor(shape, dir, pos) {
        this.shape = shape; 
        this.dir = dir; 
        this.pos = pos; 
    }// constructor(shape, location)

    forward(distance) {
        this.pos.x += distance * Math.cos(this.dir.rad);
        this.pos.y += distance * Math.sin(this.dir.rad);
    }// forward(distance)

    rotate(angle) {
        this.dir = Angle.degree(this.dir.deg + angle.deg);
    }// rotate(degrees)

    draw() {
        this.shape.draw(this.pos, this.dir);
    }// draw()
}// class Body

class Entity extends Body {
    constructor(type, shape, dir, pos) {
        super(shape, dir, pos);
        this.type = type;
        this.index = Game.addEntity(this);
    }// constructor(shape, location)

    kill() {
        Game.removeEntity(this.index);
    }// kill()
}// class Entity
