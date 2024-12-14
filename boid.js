const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let boidNumber = 10
let boidRadius = 10
let boids = []

let boidSeperationRadius = 40
let boidAvoidanceFactor = 0.01

let boidSightRadius = 80
let matchingFactor = 0.01

let margin = 50
let leftMargin = margin
let topMargin = margin
let rightMargin = canvas.width-margin
let bottomMargin = canvas.height-margin
let turnFactor = 0.2

let boidMinSpeed = 4
let boidMaxSpeed = 6

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
        ctx.arc(this.position.x, this.position.y, boidSightRadius, 0, 2*Math.PI);
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
        
        let boidDistancesX = 0
        let boidDistancesY = 0

        let boidVelocityAverageX = 0
        let boidVelocityAverageY = 0
        let boidsInSight = 0

        boids.forEach(boid => {
            if(boid === this) {return}

            if(isInCircle(boidSightRadius, this.position, boid.position)) {
                boidVelocityAverageX += boid.velocity.x
                boidVelocityAverageY += boid.velocity.y
                boidsInSight += 1
            }

            if(isInCircle(boidSeperationRadius, this.position, boid.position)) {
                boidDistancesX += this.position.x - boid.position.x
                boidDistancesY += this.position.y - boid.position.y
            }
        });

        //SEPERATION
        this.velocity.x += boidDistancesX*boidAvoidanceFactor
        this.velocity.y += boidDistancesY*boidAvoidanceFactor

        //ALIGNMENT
        if(boidsInSight > 0) {
            boidVelocityAverageX = boidVelocityAverageX/boidsInSight
            boidVelocityAverageY = boidVelocityAverageY/boidsInSight

            this.velocity.x += (boidVelocityAverageX - this.velocity.x)*matchingFactor
            this.velocity.y += (boidVelocityAverageY - this.velocity.y)*matchingFactor
        }
        //EDGE AVOIDANCE
        if (this.position.x < leftMargin) {
            this.velocity.x += turnFactor }
        if (this.position.x > rightMargin) {
            this.velocity.x -= turnFactor }
        if (this.position.y < topMargin) {
            this.velocity.y += turnFactor}
        if (this.position.y > bottomMargin) {
            this.velocity.y -= turnFactor }
        
        //MIN AND MAX SPEEDS
        let boidSpeed = Math.hypot(this.velocity.x, this.velocity.y)
        if(boidSpeed < boidMinSpeed) {
            this.velocity.x = (this.velocity.x/boidSpeed)*boidMinSpeed
            this.velocity.y = (this.velocity.y/boidSpeed)*boidMinSpeed
        } 
        if(boidSpeed > boidMaxSpeed) {
            this.velocity.x = (this.velocity.x/boidSpeed)*boidMaxSpeed
            this.velocity.y = (this.velocity.y/boidSpeed)*boidMaxSpeed
        } 
        //UPDATE
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}