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

    getOrentation(p, q, r) {
        var exp = (q.y - p.y)*(r.x - q.x) - (q.x - p.x)*(r.y - q.y);

        if(exp > 0) return 1;
        else if(exp < 0) return -1;
        else return 0;
    }// getOrentation(p, q, r)

    intersects(line2) { // I think this works. Probably???
        var a1 = this.point1;
        var b1 = this.point2;
        var a2 = line2.point1;
        var b2 = line2.point2;

        if(
            this.getOrentation(a1, b1, a2) != this.getOrentation(a1, b1, b2) &&
            this.getOrentation(a2, b2, a1) != this.getOrentation(a2, b2, b1)
        ) return true;

        else return false;
    }// intersects(line2)
}// class Line

class Shape {
    constructor(points) {
        this.points = points;
    }// constructor(points)

    getPoint(index, direction) {
        var pCoordinate = new PolarCoordinate(this.points[index].getPolar().r, Angle.degree(this.points[index].getPolar().dir.deg + direction.deg));
        let x = pCoordinate.getPoint().x;
        let y = pCoordinate.getPoint().y;

        return new Point(x, y);
    }// getPoint(dir)

    draw(point, direction) {
        Game.ctx.beginPath();
        let p1 = this.getPoint(0, direction);
        Game.ctx.moveTo(p1.x + point.x, p1.y + point.y);

        for(let i = 1; i < this.points.length; i++) {
            let p1 = this.getPoint(i, direction);
            Game.ctx.lineTo(p1.x + point.x, p1.y + point.y);
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

    getPoint(index) {
        var p = this.shape.getPoint(index, this.dir);
        return new Point(p.x, p.y);
    }// getPoint(index)

    get boundingBox() {
        var xMin = this.shape.getPoint(0, this.dir).x;
        var xMax = this.shape.getPoint(0, this.dir).x;
        var yMin = this.shape.getPoint(0, this.dir).y;
        var yMax = this.shape.getPoint(0, this.dir).y;

        for(let i = 1; i < this.shape.points.length; i++) {
            if(this.shape.getPoint(i, this.dir).x < xMin) xMin = this.shape.getPoint(i, this.dir).x;
            else if(this.shape.getPoint(i, this.dir).x > xMax) xMax = this.shape.getPoint(i, this.dir).x;

            if(this.shape.getPoint(i, this.dir).y < yMin) yMin = this.shape.getPoint(i, this.dir).y;
            else if(this.shape.getPoint(i, this.dir).y > yMax) yMax = this.shape.getPoint(i, this.dir).y;
        }

        return new Body(new Shape([
            new Point(xMin, yMin),
            new Point(xMax, yMin),
            new Point(xMax, yMax),
            new Point(xMin, yMax)
        ]), Angle.degree(0), this.pos);
    }// boundingBox()

    isTouching(thing) {
        var box1 = this.boundingBox;
        var box2 = thing.boundingBox;

        // create testLine
        var xMin = box1[0].x;
        var yMin = box1[0].y;

        // this
        for(let i = 1; i < this.getBoundingBox().length; i++) {
            if(this.getBoundingBox()[i].x < xMin)
                xMin = this.getBoundingBox()[i].x;
            if(this.getBoundingBox()[i].y < yMin)
                yMin = this.getBoundingBox()[i].y;
        }

        // other entity
        for(let i = 1; i < thing.getBoundingBox().length; i++) {
            if(e2.getBoundingBox()[i].x < xMin)
                xMin = thing.getBoundingBox()[i].x;
            if(e2.getBoundingBox()[i].y < yMin)
                yMin = thing.getBoundingBox()[i].y;
        }

    }// isTouching(thing)

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

    static fromBody(body, type) {
        return new this(type, body.shape, body.dir, body.pos);
    }

    kill() {
        Game.removeEntity(this.index);
    }// kill()

    forward(distance) {
        this.pos.x += distance * Math.cos(this.dir.rad);
        this.pos.y += distance * Math.sin(this.dir.rad);
    }// forward(distance)

    rotate(angle) {
        this.dir = Angle.degree(this.dir.deg + angle.deg);
    }// rotate(degrees)
}// class Entity
