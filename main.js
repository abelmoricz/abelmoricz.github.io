

var head= document.getElementsByTagName('head')[0];
    var resize_p5_func_script= document.createElement('resize_p5_func');
    script.src= 'resize_p5_func.js';
    head.appendChild(resize_p5_func_script);




function setup(){
    createCanvas(dw_getWindowDims().width ,dw_getWindowDims().height);
    
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