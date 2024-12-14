const inputs = document.querySelectorAll('input');

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    boids.forEach(boid => {
        // console.log(boid)
        boid.update()
    })
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
    rightMargin = canvas.width-margin
    bottomMargin = canvas.height-margin
}

function variableUpdate() {
    console.log(window["boidNumber"])
    window[this.name] = this.value
    console.log(boidNumber)
}

function changeBoidNumber(number) {
    boidNumber = number
    boids = boids.slice(0, number)
    addBoids(boids.length, boidNumber)
}

function addBoids(start, end) {
    for (let index = start; index <= end; index++) {
        boids[index] = new Boid({
            position: {
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height
            },
            velocity: {
                x: Math.random()*10-5,
                y: Math.random()*10-5
                // x: Math.random()*10-5,
                // y: Math.random()*10-5
            }
        })
    }
}
window.onresize = debounce(() => resizeWindow())

window.onload = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    addBoids(0, boidNumber)

    rightMargin = canvas.width-margin
    bottomMargin = canvas.height-margin
    animate()
}

// inputs.forEach(input => input.addEventListener('change', variableUpdate));