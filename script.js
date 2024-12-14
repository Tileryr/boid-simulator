const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let boidNumber = 1

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boid {
    constructor({position, velocity, alignRadius, separateRadius}) {
        this.position = position
        this.velocity = velocity
        this.alignRadius = alignRadius
        this.separateRadius = separateRadius
    }

    draw() {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = '3'
        // ctx.strokeRect(this.position.x, this.position.y, 30, 30)

        var triangle = makeTriangle(this.position, 10)

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
    }
}

let boid = new Boid({
    position: {
        x: 50,
        y: 50
    },
    velocity: {
        x: 10,
        y: 10
    }
})

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    boid.update()
}

function makeTriangle(position, radius, rotation = 0) {
    let number = (rotation/Math.PI)*3
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
    console.log(newTriangle)
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
    playerWidth = widthPercent(playerPercent)
}

window.onresize = debounce(() => resizeWindow())

window.onload = animate