//Canvas Indentity
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

const groundH = H * 0.100

let X = 0
let Y = 0

export default class Model {

    constructor(){

        this.movingLeftImages = []
        
        this.movingRightImages = []

        this.attackLeftImages = []

        this.attackRightImages = []

        this.idleImages = []

        this.setImages()

        this.background = new Image()
        this.background.src= "../background.jpg"

        this.activeImages = []
    }

    setImages(){

        //idle

            this.idleImages[1] = new Image()
            this.idleImages[1].src = `../sprites/idle/idle-left.png`

            this.idleImages[2] = new Image()
            this.idleImages[2].src = `../sprites/idle/idle-right.png`

        //moving

        for (let i = 1; i != 5; i++)
        {
            this.movingLeftImages[i] = new Image()
            this.movingLeftImages[i].src = `../sprites/moveleft/move-left-${i}.png`

            this.movingRightImages[i] = new Image()
            this.movingRightImages[i].src= `../sprites/moveright/move-right-${i}.png`
        }

        //attack

        for (let i = 1; i != 8; i++)
        {
            this.attackLeftImages[i] = new Image()
            this.attackLeftImages[i].src = `../sprites/attackleft/attack-left-${i}.png`

            this.attackRightImages[i] = new Image()
            this.attackRightImages[i].src= `../sprites/attackright/attack-right-${i}.png`
        }

        //hurt

        for (let i = 1; i != 20; i++)
        {
            
        }
    }

} 
const model = new Model()



class Balls {

    constructor(x, y, r, c, v) {

        this.x = x
        this.y = y
        this.id = ballId

        this.v = v
        this.dX = 5 * Math.cos(v)
        this.dY = 5 * Math.sin(v)
        this.aX = 1
        this.aY = 1

        this.c = c // color
        this.R = r // circle radius
        this.a = 0.9
        this.stop=false
    }
    
    update(){

        //Check X

        if (this.x + this.dX*this.aX < this.R) {

            this.x = this.R
            this.dX = -this.dX 
            this.aX = 1
        }

        else if (this.x + this.dX*this.aX > W - this.R){

            this.x = W - this.R
            this.dX = -this.dX 
            this.aX = 1
        }

        else{

            this.aX += 0.02
            this.x += this.dX*this.aX
        }

        //Check Y

        if(this.y + this.dY*this.aY < this.R){

            this.y = this.R
            this.dY = -this.dY 
            this.aY = 1
        }

        else if(this.y + this.dY*this.aY > H - groundH - this.R){

            this.y = H - groundH - this.R
            this.dY = -this.dY 
            this.aY = 1 
        }
        
        else{

            this.aY += 0.02
            this.y += this.dY*this.aY
        }

    }

    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke()
    }
   
    testDamage(){
    }    
}

//Ball Creation
let b = new Array()
let ballId = 1
createBalls();

function createBalls(){

    for (let i = 0; i < 2; i++) {

        // random position
        let xInit = 20 + Math.random() * (W - 2 * 20);
        
        // random velocity
        let velocity = Math.random() * 2 * Math.PI

        b.push(new Balls(xInit, 50, 20, 'Red', velocity))
        
        ballId++
    }
}



//Movement 

let left = false
let right = false
let playerSpeed = 15

let direction = "right"
let state = "idle"
let frame = 1
let attack = false

let projectileId = 1

//Set Movement Frames/States
function getFrame(){

    if(right == false && left == false){

        state = "idle"
    }

    else if(right == true && left == true){

        state = "idle"
    }

    else{

        state = "moving"
    }

    if(attack){
        
        state = "attacking"
    }

    switch(state){

        case "idle":{

            if(direction == "right"){

                frame = 2
                model.activeImages = model.idleImages
            }

            else{

                frame = 1
                model.activeImages = model.idleImages
            }

            break;
        }

        case "moving":{

            switch(direction){

                case "right": {

                    if(frame < 4){
                        frame++
                    }
        
                    else
                    {
                        frame = 1
                    }
    
                    model.activeImages = model.movingRightImages

                    break;
                }

                case "left": {

                    if(frame < 4){
                        frame++
                    }
        
                    else
                    {
                        frame = 1
                    }
    
                    model.activeImages = model.movingLeftImages

                    break;
                }

                default: break;
            }

            break;
        }

        case "attacking":{

            switch(direction){

                case "right": {

                    if(frame < 7){
                        frame++
                    }
        
                    else{

                        attack = false
                    }
    
                    model.activeImages = model.attackRightImages

                    break;
                }

                case "left": {

                    if(frame < 7){

                        frame++
                    }
        
                    else{

                        attack = false
                    }
    
                    model.activeImages = model.attackLeftImages

                    break;
                }

                default: break;
            } 

            if(frame == 4 && p.length < 1){
                
                p.push(new Projectile(X+20,characterHeight))
                projectileId ++
            }
        }
    }
}


//Action Detection
window.addEventListener('keydown',keyPressed)
window.addEventListener('keyup',keyLeft)
window.addEventListener('click',event=>{attack = true; frame = 1})


function keyPressed(e){

    switch(e.key){
        case 'a': {left = true; direction="left"; break;}
        case 'd': {right = true; direction="right"; break;}
        default: break;
    }
}

function keyLeft(e){

    switch(e.key){
        case 'a': left = false; break;
        case 'd': right = false; break;
        default: break;
    }
}



//Set Animation
window.onload = function(){

    setInterval(render,1000/20)
}


//create Projectiles

let p = new Array()

class Projectile{

    constructor(x,y){

        this.x = x
        this.y = y
        this.id = projectileId

        this.vY = 10 //velocity
        this.c = '#0066ff' // color
        this.R = 5 // circle radius
        this.stop = false
    }

    update(){

        if (this.y > 5) {

            this.y -= 20
        }

        else{

            p = p.filter(obj=>obj.id != this.id)
        }
    }

    draw(){

        ctx.fillStyle = this.c;
        ctx.beginPath()
        ctx.moveTo(this.x,characterHeight)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
    }

    testColision(){

        b.forEach(ball=>{

            if(ball.x + ball.R < this.x){
                
                if(this.x - ball.x < ball.R && this.y < ball.y && ball.y < characterHeight){

                    if(ball.R > 5){
                        
                        p = p.filter(obj=>obj.id != this.id)
                        b.push(new Balls(ball.x + 20, ball.y, ball.R/2, 'Red', ball.v * Math.random()*6))
                        ballId++
                        b.push(new Balls(ball.x - 20, ball.y, ball.R/2,'Red', ball.v * Math.random()*6))
                        ballId++

                        b = b.filter(obj=>obj.id != ball.id)
                    }
                    else{
                        p = p.filter(obj=>obj.id != this.id)
                        b = b.filter(obj=>obj.id != ball.id)
                    }
                }
            }

            if(ball.x + ball.R > this.x){
                
                if(ball.x - this.x < ball.R && this.y < ball.y && ball.y < characterHeight){

                    if(ball.R > 5){
                        
                        p = p.filter(obj=>obj.id != this.id)
                        b.push(new Balls(ball.x + 20, ball.y, ball.R/2, 'Red', ball.v * Math.random()*6))
                        ballId++
                        b.push(new Balls(ball.x - 20, ball.y, ball.R/2,'Red', ball.v * Math.random()*6))
                        ballId++

                        b = b.filter(obj=>obj.id != ball.id)
                    }
                    else{
                        p = p.filter(obj=>obj.id != this.id)
                        b = b.filter(obj=>obj.id != ball.id)
                    }
                }
            }
        })

    }
}


let characterHeight = H - groundH -50

//render
function render(){

    ctx.clearRect(0,0,W,H)

    ctx.drawImage(model.background,0,0)

        getFrame()


        //Draw Character Oriented
        if(right == true  && attack == false){

            if(X < W-40)
            {
                X+= playerSpeed
            }   
        }

        if(left == true && attack == false){
            
            if (X > 10)
            {
                X-= playerSpeed
            }
        }

        ctx.drawImage(model.activeImages[frame],X,characterHeight,40,50)


        //Draw Balls
        b.forEach(function (ball) {
            ball.draw()
        })


        //Bounce Balls
        b.forEach(ball=> {
            ball.update()
        })

        b.forEach(ball=>{
            ball.testDamage()
        })


        //Attacking Situations 
        if(p.length != 0){

            p.forEach(function (projectile) {
                projectile.draw()
            })

            p.forEach(projectile=>{
                projectile.update()
            })

            p.forEach(projectile=>{
                projectile.testColision()
            })
        }

}