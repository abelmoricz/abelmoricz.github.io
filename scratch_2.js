let speed;

let x;
let y;
let angle;
let a, b, c, d;

function setup(){
  createCanvas(600,600);
  speed = 2;
  y = 50;
  a=0;
  b=0;
  c=0;
  d=0;
}

function draw()
{

  background(0);

  if (x>= 0 && x <= 300){
    fill(255, 0, 0);
  } else if (x>= 300 && x <= 450){
    fill(0, 255, 0);
  } else if (x>= 450 && x <= 600){
    fill(0, 0, 255);
  }

  y = 50*sin(angle)+height/2;
  
  angle += 0.1;
  
  noStroke();
  ellipse(x, y, 20, 20);
  
  x += speed;
  
  if (x >= 591){
   speed = -2;
  } else if (x < 10){
    speed = 2;
  } 

  pushMatrix();
  fill(255);
  rect(a, b, c, d);
  popMatrix();
} 

function mousePressed() {
  a=mouseX;
  b=mouseY;
}


function mouseDragged() {
  c=mouseX-a;
  d=mouseY-b;
  rect(a, b, c, d);
}