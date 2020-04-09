//https://forum.processing.org/two/discussion/14156/processing-how-to-make-balls-collide-off-of-each-other
/**
 * LoadImageErrorOverride (v1.12)
 * by GoToLoop (2015/Jul/09)
 *
 * forum.Processing.org/two/discussion/11608/
 * i-can-t-display-images-dynamically-loaded-from-web-
 * with-p5-js-always-a-cross-domain-issue#Item_3
 */


let numBalls = 8;
let spring =   1; // or 1.0 ???
let gravity = 0.1;
let balls = [];
let friction = 0.99;  //ideal friction between 0.999(almost none) to 0.9(very heavy)
let img;
let img_arr = [];

function loadImageErrorOverride(errEvt) {
  const pic = errEvt.target;
  if (!pic.crossOrigin)  return print('Failed to reload ' + pic.src + '!');
  print('Attempting to reload it as a tainted image now...');
  pic.crossOrigin = null, pic.src = pic.src;
}


 
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < numBalls; ++i){
    img = loadImage('assets/'+i+'.png',function (pic) { print(img = pic), redraw(); },
  loadImageErrorOverride);
    img_arr[i] = img;
  }

  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(width), random(height), 40, i, balls, img_arr[i]);
  }
  noStroke();
  fill(255, 204);
}
 
function draw() {
  background(255);
  balls.forEach (ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

 
// ==========================================================================
 
class Ball {
 
  // the constructor
  constructor(xin, yin, din, idin, oin, text_img_in) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.pic = text_img_in;

  }
 
  collide() {
    // we start one ball higher in the list (id+1) and compare 
    for (let i = this.id + 1; i < numBalls; i++) {
 
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
 
      let distance = dist(this.x, this.y, 
        this.others[i].x, this.others[i].y );   // sqrt(dx*dx + dy*dy);  // new !!!
 
      let minDist = (this.others[i].diameter/2 + this.diameter/2 + 2); // +2 is new !!! 
 
      if (distance < minDist) { 
        let angle = atan2(dy, dx);
        // targetX = this.x + cos(angle) * minDist;
        //let targetY = this.y + sin(angle) * minDist;
        let targetX = this.x + (cos(angle) * minDist);
        let targetY = this.y + (sin(angle) * minDist);
 
        // calculate the change of speed for both balls 
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx = this.vx - ax;
        this.vy = this.vy - ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }
 
  move() {
    this.vy += gravity;
    this.vx *= friction;
    this.x += this.vx;
    this.y += this.vy;
 
    // collide screeen borders 
    if (this.x + this.diameter > width) {
      this.x = width - this.diameter;
      this.vx = -1 * abs(this.vx);
    } else if (this.x - this.diameter/100 < 0) {
      this.x = this.diameter/100;
      this.vx = abs(this.vx);
      ;
    }
    if (this.y + this.diameter > height) {
      this.y = height - this.diameter;
      this.vy = (-1* abs(this.vx))/friction;
    } else if (this.y - this.diameter < 0) {
      this.y = this.diameter;
      this.vy = abs(this.vx);
    }
  }
 
  display() {
    //fill(255,50); 
    //textFont('CourierNew');
    //rect(this.x, this.y, this.diameter, this.diameter);
    image(this.pic, this.x, this.y, this.diameter, this.diameter);
    
  }//method
}//class
//