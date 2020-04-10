let x =0;

function setup() {
    createCanvas(500, 500);
  }
  
  function draw() {
    background(204);
    x = x + 0.1;
    if (x > width) {
      x = 0;
    }
    line(x, 0, x, height);
  }
  
  function mousePressed() {
    noLoop();
  }
  
  function mouseReleased() {
    loop();
  }