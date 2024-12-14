const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

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
    boids[0] = new Boid({
        position: {
            x: canvas.width/2,
            y: canvas.height
        },
        velocity: {
            x: 0,
            y: -3
        }
    })
    boids[1] = new Boid({
        position: {
            x: canvas.width/2,
            y: 0
        },
        velocity: {
            x: 0,
            y: 3
        }
    })
    // for (let index = 0; index < boidNumber; index++) {
    //     boids[index] = new Boid({
    //         position: {
    //             x: Math.random()*canvas.width,
    //             y: Math.random()*canvas.height
    //         },
    //         velocity: {
    //             x: Math.random()*10-5,
    //             y: Math.random()*10-5
    //             // x: Math.random()*10-5,
    //             // y: Math.random()*10-5
    //         }
    //     })
    // }
    animate()
}