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
let patience = 0;


function loadImageErrorOverride(errEvt) {
  const pic = errEvt.target;
  if (!pic.crossOrigin)  return print('Failed to reload ' + pic.src + '!');
  print('Attempting to reload it as a tainted image now...');
  pic.crossOrigin = null, pic.src = pic.src;
}

function setup()
{
    mgr = new SceneManager();
    //preloads images
    for(let i = 0; i < 144; ++i){
      img = loadImage('assets/'+i+'.png',function (pic) { print(img = pic), redraw(); },
    loadImageErrorOverride);
      img_arr[i] = img;
    }
    
}

function draw()
{
    let html_element = document.getElementById("all");
    mgr.draw();
    
    if(html_element.style.display === "none"){
      mgr.showScene( FallApart );
    }
    if(patience > 20){
      window.location.reload(false); 
    }
    
}

function mousePressed(){ mgr.handleEvent("mousePressed"); }

//================================================================================================================================


function FallApart(){
  let numBalls = 144; //144
  let balls = [];
  let friction = 0.999;  //ideal friction between 0.999(almost none) to 0.9(very heavy)
  let stop_border = 0.00001;
  
  

    this.setup = function() {
      createCanvas(windowWidth, windowHeight);
      
      //display images
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
      background(255);
      balls.forEach (ball => {
        ball.display();
        ball.collide();
        ball.move();
        //ball.cursor();
      });

    }
    
    this.mousePressed = function() {
      balls.forEach (ball => {
        ball.clicked();
      })
    }
  
  // ==========================================================================
  
  class Ball {
  
    // the constructor
    constructor(xin, yin, din, idin, oin, text_img_in) {
      this.x = xin;
      this.original_x = xin;
      this.y = yin;
      this.original_y = yin;
      this.vx =random(-5,5);
      this.vy = random(-5,5);
      this.diameter = din;
      this.id = idin;
      this.others = oin;
      this.pic = text_img_in;
      this.stroke_weight = 1;
      this.movable = true;

    }
  
    collide() {

      
      for (let i = 0; i < numBalls; i++) {
  
        let dx = this.others[i].x - this.x;
        let dy = this.others[i].y - this.y;
      
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
        if(dy <= 0 && distance_x < distance_y){
          top_bounce = true;
          bottom_bounce = false;
        }
        if(dy > 0 && distance_x < distance_y){
          top_bounce = false;
          bottom_bounce = true;
        }
          
        if(distance_x <= 40 && distance_y <= 40 && distance_x != 0 && (right_bounce || left_bounce)){
          if(right_bounce){
            this.x = this.others[i].x - 40;
          }
          if(left_bounce){
            this.x = this.others[i].x + 40;
          }
          let temp = this.vx;
          this.vx = this.others[i].vx;
          this.others[i].vx = temp;
          
        }
        if(distance_x <= 40 && distance_y <= 40 && (distance_y > 10) && (top_bounce || bottom_bounce)){
          if(top_bounce){
            this.y = this.others[i].y + 40;
          }
          if(bottom_bounce){
            this.y = this.others[i].y -40;
          }
          let temp = this.vy
          this.vy = this.others[i].vy; 
          this.others[i].vy = temp;
          
        }//end if
      }//end for
    }// end collide
  
    move() {
      if(abs(this.vy) > stop_border){
        //this.vy = this.vy + gravity;
      }
      this.vy *= friction;
      this.vx *= friction;
      
      if(abs(this.vy) < stop_border){
        this.vy = 0;
      }
      if(abs(this.vx) < stop_border){
        this.vx = 0;
      }

      
      
      //console.log(balls[126].vy)
      this.x += this.vx;
      this.y += this.vy;
  
      // collide screeen borders 
      if (this.x + this.diameter > width) {
        this.x = width - this.diameter;
        this.vx = -1 * abs(this.vx);
      } else if (this.x <= 0) {
        this.x = 0;
        this.vx = abs(this.vx);
      }
      if (this.y + this.diameter >= height) {
        this.y = height - this.diameter;
        this.vy = -1 * this.vy;
      } else if (this.y < 0) {
        this.y = 0;
        this.vy = abs(this.vy);
      }
    }
  
    display() {
      image(this.pic, this.x, this.y, this.diameter, this.diameter);
      fill(255,0)
      stroke(0, 10);
      strokeWeight(this.stroke_weight);      
      rect(this.x, this.y, this.diameter, this.diameter); 
    }
    
    clicked() {
        if(mouseX < this.x + 40 && mouseX > this.x && mouseY < this.y + 40 && mouseY > this.y){
          this.vx = 0;
          this.vy = 0;
          this.x = this.original_x;
          this.y = this.original_y;
          this.stroke_weight = 0;
          this.movable = false; 
          patience += 1;
        }
      }
    cursor() {
      
    }

    
    //method
  }//class
  //
}
