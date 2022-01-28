let inputString = parent.location.href;
let tagDiv;


function preload() {
    background = loadImage('images/p4.jpg');
  
}



function setup() {

  cnv=createCanvas(windowWidth, windowHeight)
 
  ZOOM=1
  background.resize(windowWidth*ZOOM,windowHeight*ZOOM*0.8)
  
  image(background, 0, 130);
}


function draw() {

  image(background,windowWidth, windowHeight);

}

