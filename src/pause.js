let inputString = parent.location.href;
let tagDiv;


function preload() {
  QRimg = loadImage('images/qr.png');
  background = loadImage('images/background_color.jpg');
}



function setup() {

  cnv=createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER); textFont('monospace', 50); textStyle(BOLD)
  stroke(200,200,200,10);
  strokeWeight(2)
  fill(255)
  
  tagDiv = createDiv();
  // position it:
  tagDiv.position(30, 30);
  console.log(inputString);
  frameRate(13)
  tint(255, 100);
  background.resize(windowWidth,windowHeight)
  
  image(background, 0, 0);
}


function draw() {

  tint(255, 199);
  image(QRimg,windowWidth/2-200, windowHeight /3);
  text("Poesia + IA = ARTE",windowWidth/2, windowHeight/4)

}


function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    // let fs = fullscreen();
    fullscreen(true)
    background(0,0,0)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}