

let spring = 0.00001;
let gravity = 0.03
let friction = -0.9;
let balls = [];
let text_arr = ["Home", "About Me", "Projects",  
"My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n",

"My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time",

"My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n\
My paragraph is going to go on for a very long time \n",];

let text_size_arr = [40,80,40,10,10,20];
let text_lines_arr = [1,1,1,2,12,4]
let numBalls = text_arr.length;




function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBalls-4; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      textWidth(text_arr[i]),
      i,
      balls,
      text_arr[i],
      text_size_arr[i],
      text_lines_arr[i],
    );
  }


  noStroke();
  fill(255, 204);
}

function draw() {
  background(255);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

class Ball {
  constructor(xin, yin, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.id = idin;
    this.others = oin;
    

  }
  /*fill(255,0,0);
    rect(this.x, this.y, this.width, 2);
    fill(85,255,0);
    rect(this.x, this.y+this.height, this.width, 2);*/

  collide() {
    //for (let i = 0; i < numBalls-4; ++i) {
        //for(let j = 0; i < numBalls-4; ++i){
            if(balls[0].y+balls[0].height >= balls[1].y){
                balls[0].y -=10;
                balls[0].velocity_y *= -1;
                
                //balls[j].y = balls[i].y+balls[i].height;

            }
        //}
    //}

  }

  move() {
    this.velocity_y += gravity;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    if ((this.x + (this.width))> width) {
      this.x = width - this.width ;
      this.velocity_x *= friction;
    } else if (this.x < 0) {
      this.x = 0;
      this.velocity_x *= friction;
    }
    
    if (this.y + this.height > height) {
      this.y = height - this.height;
      this.velocity_y *= friction;
    } else if (this.y - this.height < 0) {
      this.y = this.height;
      this.velocity_y *= friction;
    }
    
  }

  display() {
    textSize(this.text_size);
    fill(0);
    textAlign(CENTER);
    text(this.text, this.x, this.y, this.width, this.height);

    //fill(50,50);
    //rect(this.x, this.y, this.width, this.height);
    fill(255,0,0);
    rect(this.x, this.y, this.width, 2);
    fill(85,255,0);
    rect(this.x, this.y+this.height, this.width, 2);
    
    
    
  }
}
