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
let back_button_img;
let img_arr = [];
let col_num = 9;
let row_num;
let row_num_about = 5;
let row_num_projects = 7;
let correct_pieces = 0;

let side_length = 80;
let whole_img = 'about_me';


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
    row_num = row_num_about;

    let document_url = String(document.location.href);
    if(document_url.slice(document_url.length-13,document_url.length) === "projects.html"){

      row_num = row_num_projects;
      whole_img = 'projects';
    }
  
    


    for(let i = 0; i < (col_num*row_num); ++i){
      img = loadImage('assets/'+ whole_img + '/' + i +'.png',function (pic) { print(img = pic), redraw(); },
    loadImageErrorOverride);
      img_arr[i] = img;
    }

    //back button loading
    back_button_img = loadImage('back_button.png',function (pic) { print(img = pic), redraw(); },
    loadImageErrorOverride);
    
    // = row_num_projects;
    
}

function draw()
{
    

    let html_element = document.getElementById("all");
    mgr.draw();
    
    if(html_element.style.display === "none"){
      mgr.showScene( FallApart );
    }
    check_for_ending();

    
}

function mousePressed(){ mgr.handleEvent("mousePressed"); }


check_for_ending = function() {
  if(correct_pieces >= 5){
    console.log("check for ending function called");
    //erase();
    //location.href = "win.html";
    //window.location.reload(false);

  }
}

//================================================================================================================================


function FallApart(){
  let balls = [];
  
    this.setup = function() {
      createCanvas(windowWidth, windowHeight);
      
      //display images
      let pic_counter = 0;
      let x_offset = (windowWidth*.5)-366;
      let y_offset =39;

    for(let i = 0; i < row_num; ++i){
      for (let j = 0; j < col_num; ++j){
        balls[pic_counter] = new Ball(x_offset+(j*side_length), y_offset + (side_length*i), side_length, pic_counter, balls, img_arr[pic_counter], true);
        pic_counter += 1;
      }
    }
    balls[pic_counter] = new Ball(width-side_length, 0, side_length,pic_counter, balls, back_button_img, false)
      noStroke();
    }
  
    this.draw = function() {
      background(255);
      fill(100);

      
      
      balls.forEach (ball => {
        ball.display();
        ball.collide();
        ball.move();
      });

    }
    
    this.mousePressed = function() {
      balls.forEach (ball => {
        ball.clicked();
      })
      balls[(balls.length)-1].go_back();
    }
  
  // ==========================================================================
  

    

  class Ball {
  
    // the constructor
    constructor(xin, yin, din, idin, oin, text_img_in, movable_in) {
      this.x = xin;
      this.original_x = xin;
      this.y = yin;
      this.original_y = yin;
      this.vx = random(-2,2);
      this.vy = random(-2,2);
      this.diameter = din;
      this.id = idin;
      this.others = oin;
      this.pic = text_img_in;
      this.stroke_weight = 1;
      this.movable = movable_in;

    }
  
    collide() {

      for (let i = 0; i < balls.length; i++) {
  
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
        //LEFT and RIGHT bounce
        if(distance_x <= side_length && distance_y <= side_length && distance_x != 0 && (right_bounce || left_bounce)){
          if(right_bounce){ this.x = this.others[i].x - side_length; }
          if(left_bounce){ this.x = this.others[i].x + side_length; }
          
          let temp = this.vx;
          if(this.movable && this.others[i].movable){
          this.vx = this.others[i].vx;
          this.others[i].vx = temp;
          }
          if(this.movable && !(this.others[i].movable)){
            this.vx *= -1;
          }
          
        }
        if(distance_x <= side_length && distance_y <= side_length && (distance_y != 0) && (top_bounce || bottom_bounce)){
          if(top_bounce){ this.y = this.others[i].y + side_length; }
          if(bottom_bounce){ this.y = this.others[i].y -side_length; }
          
          let temp = this.vy
          if(this.movable && this.others[i].movable){
          this.vy = this.others[i].vy; 
          this.others[i].vy = temp;
          }
          if(this.movable && !(this.others[i].movable)){
            this.vy *= -1;
          }
          
        }//end if
        if(!this.movable){
          this.x = this.original_x;
          this.y = this.original_y;
        }

      }//end for
    }// end collide
  
    move() {
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
      } else if (this.y <= 0) {
        this.y = 0;
        this.vy = abs(this.vy);
      }
    }
  
    display() {
      image(this.pic, this.x, this.y, this.diameter, this.diameter);
      fill(255,0)
      stroke(0, 50);
      strokeWeight(this.stroke_weight);      
      rect(this.x, this.y, this.diameter, this.diameter); 
    }
    
    clicked() {
        if(mouseX < this.x + side_length && mouseX > this.x && mouseY < this.y + side_length && mouseY > this.y){
          this.vx = 0;
          this.vy = 0;
          this.x = this.original_x;
          this.y = this.original_y;
          if(this.movable){
            correct_pieces += 1;
          }
          this.movable = false; 
          //correct_pieces += 1;
          console.log(correct_pieces);
        }
      }
    go_back() {
      if(mouseX < this.x + side_length && mouseX > this.x && mouseY < this.y + side_length && mouseY > this.y){
        window.location.reload(false);
      }
      
    }

    
    //method
  }//class
  //
}
