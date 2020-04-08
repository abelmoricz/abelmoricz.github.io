let w = 30, x = 20, y = 20;
let count;
let balls = [];
function setup(){
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    count = width/35;
    for(var i = 0; i < count; i++, w+=30){
    	balls[i] = new Ball(x+w, y);
    }
}

function draw() {
    background(0);
    for(let i = 0; i < count; i++){
	    balls[i].move();
	    balls[i].bounce();
	    balls[i].display();
	    for(let j = i+1; j < count; j++){
	    	if(balls[i].collision(balls[j]) && i!=j){
	    		balls[i].changeColor();
	    		balls[j].changeColor();

	    		balls[i].xspeed *= -1;
	    		balls[i].yspeed *= -1;
	    		balls[j].xspeed *= -1;
	    		balls[j].yspeed *= -1;
	    	}
	    }
	}
}
function Ball(x, y){
	this.radius = 10;
	this.x = x;
	this.y = y;
	this.xspeed = random(-2, 2);
	this.yspeed = random(2, 3);
	this.color = random(0, 255);

	this.move = function(){
		this.x += this.xspeed;
		this.y += this.yspeed;
	}
	this.bounce = function(){
		if((this.x + this.radius >= width) || (this.x - this.radius <= 0)){
			this.xspeed *= -1;
		}
		if((this.y + this.radius >= height) || (this.y - this.radius <= 0)){
			this.yspeed *= -1;
		}
	}
	this.display = function(){
		noStroke();
		fill(this.color, 255, 255);
		ellipse(this.x, this.y, this.radius*2);
	}
	this.collision = function(other){
		d = dist(this.x, this.y, other.x, other.y);
		if(d < (this.radius + other.radius)){
			return true;
		}
		else{
			return false;
		}
	}
	this.changeColor = function(){
		this.color = this.color = random(0, 255);
	}
}