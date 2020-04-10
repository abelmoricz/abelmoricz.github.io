//https://forum.processing.org/two/discussion/14156/processing-how-to-make-balls-collide-off-of-each-other
/**
 * LoadImageErrorOverride (v1.12)
 * by GoToLoop (2015/Jul/09)
 *
 * forum.Processing.org/two/discussion/11608/
 * i-can-t-display-images-dynamically-loaded-from-web-
 * with-p5-js-always-a-cross-domain-issue#Item_3
 */



var mgr;

function setup()
{
    mgr = new SceneManager();
}

function draw()
{
    
    mgr.draw();
    //mousePressed();
    //mgr.showScene( FallApart);
    
}

function mousePressed()
{
    change_to_p5();
    mgr.showScene( FallApart );
    mgr.handleEvent("mousePressed");

}





 
function FallApart(){

  let numBalls = 144; //144
  let col_num = 16;
  let row_num = 9;

  let spring =   0.01; // or 1.0 ???
  let gravity = 0.00000001;
  let balls = [];
  let friction = 0.9;  //ideal friction between 0.999(almost none) to 0.9(very heavy)
  let img;
  let img_arr = [];

  function loadImageErrorOverride(errEvt) {
    const pic = errEvt.target;
    if (!pic.crossOrigin)  return print('Failed to reload ' + pic.src + '!');
    print('Attempting to reload it as a tainted image now...');
    pic.crossOrigin = null, pic.src = pic.src;
  }

    this.setup = function() {
      createCanvas(windowWidth, windowHeight);
      
      //Loads images
      for(let i = 0; i < 144; ++i){
        img = loadImage('assets/'+i+'.png',function (pic) { print(img = pic), redraw(); },
      loadImageErrorOverride);
        img_arr[i] = img;
      }
      //displays images
      let pic_counter = 0;
      let x_offset = (windowWidth*.5)-324;
      let y_offset = 60;
      for(let i = 0; i < row_num; ++i){
        for (let j = 0; j < col_num; ++j){
          balls[pic_counter] = new Ball(x_offset+(j*40), y_offset+(40*i), 40, pic_counter, balls, img_arr[pic_counter]);
          pic_counter += 1;
        }
      }
      noStroke();
    }
  
    this.draw = function() {
      background(100);
      balls.forEach (ball => {
        ball.display();
        ball.collide();
        ball.move();
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
  
        let minDist = (this.others[i].diameter/2 + this.diameter/2 + 10); // +2 is new !!! 
  
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
      if(gravity < 0.1){
        gravity += 0.00001;
      }
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
}
