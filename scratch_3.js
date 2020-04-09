var img; function preload(){ 
	arrowMouse = createImg("test.png"); 
	} 
	function setup(){ 
	createCanvas(1000,650); 
	} 
	function draw(){ 
	background(20,155,255); 
	fill(0,0,0); cursor("none"); 
	image(arrowMouse, mouseX, mouseY,40,40); 
	}