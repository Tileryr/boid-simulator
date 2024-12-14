let boidNumber = 10
let boidRadius = 10
let boids = []

let boidSeperationRadius = 40
let boidAvoidanceFactor = 0.01
function isInCircle(radius, center, position) {
    return Math.hypot(center.x-position.x, center.y-position.y) < radius ? true : false
}

class Boid {
    constructor({position, velocity, alignRadius, separateRadius, angle}) {
        this.position = position
        this.velocity = velocity
        this.alignRadius = alignRadius
        this.separateRadius = separateRadius
        this.angle = angle
    }

    draw() {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = '3'

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, boidSeperationRadius, 0, 2*Math.PI);
        ctx.stroke()

        this.angle = Math.atan2(this.velocity.y, this.velocity.x)
        // console.log(this.velocity.y/this.velocity.x)
        if (this.angle < 0) {this.angle+=Math.PI*2}
        
        var triangle = makeTriangle(this.position, boidRadius, this.angle)

        ctx.beginPath();
        ctx.moveTo(triangle.x1, triangle.y1);
        ctx.lineTo(triangle.x2, triangle.y2);
        ctx.lineTo(triangle.x3, triangle.y3);
        ctx.lineTo(triangle.x1, triangle.y1);
        ctx.closePath();
        ctx.stroke();
    }

    update() {
        this.draw()
        let close_dx = 0
        let close_dy = 0
        boids.forEach(boid => {
            if(boid === this) {return}
            if(isInCircle(boidSeperationRadius, this.position, boid.position)) {
                console.log("what")
                close_dx += this.position.x - boid.position.x
                close_dy += this.position.y - boid.position.y
            }
        });
        console.log(close_dy)
        this.velocity.x += close_dx*boidAvoidanceFactor
        this.velocity.y += close_dy*boidAvoidanceFactor

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}