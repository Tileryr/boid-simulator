const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let boidNumber = 300
let boidRadius = 10
let boids = []

// let boidSeperationRadius = 20
// let boidAvoidanceFactor = 0.01

// let boidSightRadius = 100
// let matchingFactor = 0.02
// let centeringFactor = 0.0001

let margin = 100
let leftMargin = margin
let topMargin = margin
let rightMargin = canvas.width-margin
let bottomMargin = canvas.height-margin
// let turnFactor = 0.15

// let boidMinSpeed = 4
// let boidMaxSpeed = 6

let tunableVariables = {
    boidSeperationRadius: 20,
    boidSightRadius: 100,
    boidAvoidanceFactor: 0.01,
    matchingFactor: 0.03,
    centeringFactor: 0.0002,
    turnFactor: 0.15,
    boidMinSpeed: 4,
    boidMaxSpeed: 6
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
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = '1'

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, tunableVariables.boidSeperationRadius, 0, 2*Math.PI);
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, tunableVariables.boidSightRadius, 0, 2*Math.PI);
        ctx.stroke()

        this.angle = Math.atan2(this.velocity.y, this.velocity.x)
        // console.log(this.velocity.y/this.velocity.x)
        if (this.angle < 0) {this.angle+=Math.PI*2}
        
        var triangle = makeTriangle(this.position, boidRadius, this.angle)

        ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
        ctx.lineWidth = '3'
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
        
        let boidDistancesX = 0
        let boidDistancesY = 0

        let boidVelocityAverageX = 0
        let boidVelocityAverageY = 0

        let boidPositionAverageX = 0
        let boidPositionAverageY = 0

        let boidsInSight = 0

        boids.forEach(boid => {
            if(boid === this) {return}

            if(isInCircle(tunableVariables.boidSightRadius, this.position, boid.position)) {
                boidVelocityAverageX += boid.velocity.x
                boidVelocityAverageY += boid.velocity.y

                boidPositionAverageX += boid.position.x
                boidPositionAverageY += boid.position.y

                boidsInSight += 1
            }

            if(isInCircle(tunableVariables.boidSeperationRadius, this.position, boid.position)) {
                boidDistancesX += this.position.x - boid.position.x
                boidDistancesY += this.position.y - boid.position.y
            }
        });

        //SEPERATION
        this.velocity.x += boidDistancesX*tunableVariables.boidAvoidanceFactor
        this.velocity.y += boidDistancesY*tunableVariables.boidAvoidanceFactor

        //ALIGNMENT
        if(boidsInSight > 0) {
            boidVelocityAverageX = boidVelocityAverageX/boidsInSight
            boidVelocityAverageY = boidVelocityAverageY/boidsInSight

            boidPositionAverageX = boidPositionAverageX/boidsInSight
            boidPositionAverageY = boidPositionAverageY/boidsInSight

            this.velocity.x += (boidVelocityAverageX - this.velocity.x)*tunableVariables.matchingFactor
            this.velocity.y += (boidVelocityAverageY - this.velocity.y)*tunableVariables.matchingFactor

            this.velocity.x += (boidPositionAverageX - this.position.x)*tunableVariables.centeringFactor
            this.velocity.y += (boidPositionAverageY - this.position.y)*tunableVariables.centeringFactor
        }
    
        //EDGE AVOIDANCE
        if (this.position.x < leftMargin) {
            this.velocity.x += tunableVariables.turnFactor }
        if (this.position.x > rightMargin) {
            this.velocity.x -= tunableVariables.turnFactor }
        if (this.position.y < topMargin) {
            this.velocity.y += tunableVariables.turnFactor }
        if (this.position.y > bottomMargin) {
            this.velocity.y -= tunableVariables.turnFactor }
        
        //MIN AND MAX SPEEDS
        let boidSpeed = Math.hypot(this.velocity.x, this.velocity.y)
        if(boidSpeed < tunableVariables.boidMinSpeed) {
            this.velocity.x = (this.velocity.x/boidSpeed)*tunableVariables.boidMinSpeed
            this.velocity.y = (this.velocity.y/boidSpeed)*tunableVariables.boidMinSpeed
        } 
        if(boidSpeed > tunableVariables.boidMaxSpeed) {
            this.velocity.x = (this.velocity.x/boidSpeed)*tunableVariables.boidMaxSpeed
            this.velocity.y = (this.velocity.y/boidSpeed)*tunableVariables.boidMaxSpeed
        } 
        //UPDATE
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}