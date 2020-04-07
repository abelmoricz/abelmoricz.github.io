var head= document.getElementsByTagName('head')[0];
   var resize_p5_func_script= document.createElement('resize_p5_func');
   script.src= 'resize_p5_func.js';
   head.appendChild(resize_p5_func_script);


function setup(){
    var canvas = createCanvas(dw_getWindowDims().width ,dw_getWindowDims().height);
    canvas.parent('sketch-div');
    
    background(32);
}

function draw(){
    fill(255);
    ellipse(mouseX, mouseY, 25, 25);
}