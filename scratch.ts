
import processing.serial.*;

let spring = 0.005;
let gravity = 0.3;
let friction = -0.9;
let balls = [];
let text_arr = ["Home", "About Meeeeeeeeeee", "Projects",  
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

  for (let i = 0; i < numBalls-5; i++) {
    balls[i] = new Ball(
      random(width),
      0,
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
  constructor(xin, yin, width_in, idin, oin, txt_in, txt_sz_in, num_lines) {
    this.x = xin;
    this.y = yin;
    this.velocity_x = 3;
    this.velocity_y = 3;
    this.width =((width_in/num_lines)/(10/txt_sz_in));
    this.height = txt_sz_in*num_lines;
    this.id = idin;
    this.others = oin;
    this.text = txt_in;
    this.text_size = txt_sz_in;

  }
  /*fill(255,0,0);
    rect(this.x, this.y, this.width, 2);
    fill(85,255,0);
    rect(this.x, this.y+this.height, this.width, 2);*/

  collide() {
    for (let i = 0; i < numBalls-5; ++i) {
        for(let j = 0; i < numBalls-5; ++i){
            if(balls[i].y > 300){
                print(balls[i].y);
                balls[i].velocity_y *= -1;
                delay(500);
            }
        }
    }

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
