function updateVariable() {
    tunableVariables[this.name] = +this.value
}

function updateColor() {
    document.documentElement.style.setProperty(`--${this.name}`, this.value)
    tunableColors[this.name] = this.value
    console.log(tunableColors[this.name])
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
