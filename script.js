const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let boidNumber = 10
let boidRadius = 10
let boids = []

canvas.width = window.innerWidth
canvas.height = window.innerHeight

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
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    boids.forEach(boid => {
        // console.log(boid)
        boid.update()
    })
}

function makeTriangle(position, radius, rotation = 0) {
    // console.log(rotation)
    let number = (rotation/Math.PI)*3
    console.log(number/3)
    let newTriangle = {
        //the first vertex is on the circumscribed circle at 0 radians where R is the radius of the circle ( R)
        //you may decide to change this.
        x1: position.x + radius * Math.cos(number*Math.PI/3),
        y1: position.y + radius * Math.sin(number*Math.PI/3),
        //the second vertex is on the circumscribed circle at 2*Math.PI/3 radians 
        //you may decide to change this.
        x2: position.x + radius * Math.cos((number+2)*Math.PI/3),
        y2: position.y + radius * Math.sin((number+2)*Math.PI/3),
        //calculate the 3-rd vertex
        x3: position.x + radius * Math.cos((number+4)*Math.PI/3),
        y3: position.y + radius * Math.sin((number+4)*Math.PI/3)
    };
    return newTriangle
}

function debounce(func, timeout = 300) {
    let timer;
    console.log(timer)
    return (...args) => {
        console.log("size")
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function resizeWindow() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight  
}

window.onresize = debounce(() => resizeWindow())

window.onload = () => {
    for (let index = 0; index < boidNumber; index++) {
        boids[index] = new Boid({
            position: {
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height
            },
            velocity: {
                x: Math.random()*10-5,
                y: Math.random()*10-5
            }
        })
    }
    animate()
}