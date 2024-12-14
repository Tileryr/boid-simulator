const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let boidNumber = 1

class Boid {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
    }

    draw() {

    }

    update() {
        
    }
}
function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
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