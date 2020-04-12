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
let img;
let img_arr = [];
let col_num = 16;
let row_num = 9;

function loadImageErrorOverride(errEvt) {
  const pic = errEvt.target;
  if (!pic.crossOrigin)  return print('Failed to reload ' + pic.src + '!');
  print('Attempting to reload it as a tainted image now...');
  pic.crossOrigin = null, pic.src = pic.src;
}

function setup()
{
    mgr = new SceneManager();
    //frameRate(1);
    for(let i = 0; i < 2; ++i){
      img = loadImage('assets/'+i+'.png',function (pic) { print(img = pic), redraw(); },
    loadImageErrorOverride);
      img_arr[i] = img;
    }
    //displays images
    /*
    let pic_counter = 0;
    let x_offset = (windowWidth*.5)-324;
    let y_offset = 60;
    for(let i = 0; i < row_num; ++i){
      for (let j = 0; j < col_num; ++j){
        balls[pic_counter] = new Ball(x_offset+(j*40), y_offset+(40*i), 40, pic_counter, balls, img_arr[pic_counter]);
        pic_counter += 1;
      }
    }*/
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
 

  let spring =  1; // or 1.0 ??? 1 is perfectly inelastic
  let gravity = 0.5;
  let balls = [];
  let friction = 0.9;  //ideal friction between 0.999(almost none) to 0.9(very heavy)
  //let dampening = 00;
  

 

    this.setup = function() {
      createCanvas(windowWidth, windowHeight);
      
      for(let i = 0; i < 20; ++i){
        balls[i] = new Ball(random(width), random(height), 40, 0, balls, img_arr[0]);
      }
  
    
       // balls[0] = new Ball(20, 0, 200, 0, balls, img_arr[0]);
        ///balls[1] = new Ball(40, 300, 200, 1, balls, img_arr[1]);
        //balls[2] = new Ball(600, 600, 200, 2, balls, img_arr[0]);
        //balls[3] = new Ball(random(width), random(height), 200, 3, balls, img_arr[1]);
        //balls[4] = new Ball(random(width), random(height), 200, 4, balls, img_arr[0]);
        //balls[5] = new Ball(random(width), random(height), 200, 5, balls, img_arr[1]);
   
      
    
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
      this.vx = random(0,5);
      this.vy = 0;
      this.diameter = din;
      this.id = idin;
      this.others = oin;
      this.pic = text_img_in;

    }
  
    collide() {
      // we start one ball higher in the list (id+1) and compare 
      for (let i = 0; i < 4; i++) {
  
        let dx = balls[i].x - this.x;
        let dy = balls[i].y - this.y;
  
        let distance_x = abs(this.x - this.others[i].x);  
        let distance_y = abs(this.y - this.others[i].y);
        //console.log(distance_x) // sqrt(dx*dx + dy*dy);  // new !!!

        let top_bounce = false;
        let bottom_bounce = false;
        let right_bounce = false;
        let left_bounce = false;
      
        if(distance_y > distance_x){
          top_bounce = true;
          bottom_bounce = true;
          right_bounce = false;
          left_bounce = false;
        }

        if(distance_x > distance_y){
          //side_bounce = true;
          right_bounce = true;
          left_bounce = true;
          top_bounce = false;
          bottom_bounce = false;
        }

        if(dx > 0 && distance_x > distance_y){
          right_bounce = true;
          left_bounce = false;
        }
        if(dx < 0 && distance_x > distance_y){
          right_bounce = false;
          left_bounce = true;
        }
        if(dy < 0 && distance_x < distance_y){
          top_bounce = true;
          bottom_bounce = false;
        }
        if(dy >0 && distance_x < distance_y){
          top_bounce = false;
          bottom_bounce = true;
        }
          
        if(distance_x < 200 && distance_y < 200 && distance_x != 0 && (right_bounce || left_bounce)){
          //this.vx *= -0.3;
          //this.others[i].vx *= -0.3;
          if(right_bounce){
            this.x = this.others[i].x - 201;
            
          }
          if(left_bounce){
            this.x = this.others[i].x + 201;
          }
          this.vx *= -0.3;
          this.others[i].vx *= -0.3;
        }
        //console.log(distance_y);
        if(distance_x < 200 && distance_y < 200 && (distance_y > 10) && (top_bounce || bottom_bounce)){
          //this.others[i].y = this.y - 200;
          if(top_bounce){
            this.y = this.others[i].y + 201;
            //console.log("top bounce");
            //bottom_bounce = false;
          }
          if(bottom_bounce){
            this.y = this.others[i].y -201;
            //console.log("bottom bounce");
          }
          this.vy *= -0.3;
          this.others[i].vy *= -0.3;
        }


      }
    }
  
    move() {
      this.vy += gravity;
      
      //this.vx *= friction;
      //this.vy *= friction;
      this.x += this.vx;
      this.y += this.vy;
  
      // collide screeen borders 
      if (this.x + this.diameter > width) {
        this.x = width - this.diameter;
        this.vx *= -1;
      } else if (this.x - this.diameter/100 < 0) {
        this.x = this.diameter/100;
        this.vx *= -1;
        ;
      }
      if (this.y + this.diameter > height) {
        this.y = height - this.diameter;
        this.vy *= -1;
      } else if (this.y < 0) {
        this.y = 0;
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
