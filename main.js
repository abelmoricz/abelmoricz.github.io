
function setup(){
    createCanvas(windowWidth ,windowHeight);
    
    background(255);
    
    
}

function draw(){
    //menu_x_pos = dw_getWindowDims.width()/3
/*
    for (int i = 0; i < 40; i = i+1) {

        line(30, i, 80, i);
      
    }
    */
    textSize(40);
    text("Home", dw_getWindowDims().width/3.5, 50);
    text("About Me", dw_getWindowDims().width/2.5, 50);
    text("Projects", dw_getWindowDims().width/1.8, 50);

    
}