const factorDiv = document.querySelector('.factors')
const factorInputs = factorDiv.querySelectorAll('input');

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
    leftMargin = margin + canvas.width*0.1
    rightMargin = canvas.width-margin
    bottomMargin = canvas.height-margin
}

function updateVariable() {
    tunableVariables[this.name] = +this.value
}

function changeBoidAmount(amount) {
    boidNumber = amount
    boids = boids.slice(0, amount)
    for (let index = boids.length; index <= amount; index++) {
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
}

window.onresize = debounce(() => resizeWindow())

window.onload = () => {
    resizeWindow()
    changeBoidAmount(boidNumber)
    animate()
}

factorInputs.forEach(input => input.addEventListener('change', updateVariable));