var myAsciiArt;
var asciiart_width = 120; var asciiart_height = 60;
var myCapture
var gfx;
var showOryginalImageFlag = false;
var ascii_arr;
var poemGenerate=[];
var wordCounter=0;
var next = true;
let mic;
let speed = 1100 

let textSize = 12

let startTime = Math.ceil((Date.now() / speed))


function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO);
    myCapture.size(320, 240);
    myCapture.elt.setAttribute('playsinline', '');
    myCapture.hide();
    console.log(
      '[initCaptureDevice] capture ready. Resolution: ' +
      myCapture.width + ' ' + myCapture.height
    );
  } catch(_err) {
    console.log('[initCaptureDevice] capture error: ' + _err);
  }
}

function preload() {
  poemGenerate = loadStrings('poems/'+get_poem_name()+'.txt');
  console.log(poemGenerate)
  // poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');

  
}

function setup() {
  
  // poemGenerate=poemGenerate[poemGenerate.length-1].split("~").join(" \n")
  poemGenerate=poemGenerate.join(" \n")
  console.log(poemGenerate)
  cnv=createCanvas(windowWidth, windowHeight);
  initCaptureDevice(); 
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  textAlign(CENTER, CENTER); textFont('monospace', textSize); textStyle(BOLD);textWrap(WORD);
  strokeWeight(2); fill(100);
  cnv.mousePressed(userStartAudio);
  mic = new p5.AudioIn();
  mic.start();
  frameRate(15);
}


function draw() {
  if(myCapture !== null && myCapture !== undefined) { 
      background(0);
      gfx.background(0);
      gfx.image(myCapture, 0, 0, gfx.width, gfx.height);
      micLevel = mic.getLevel()*100;
      let level = micLevel % 20;
      
      gfx.filter(POSTERIZE, level+3);
      ascii_arr = myAsciiArt.convert(gfx);
      textAlign(CENTER, CENTER); textFont('monospace', textSize)
      fill(150);
      myAsciiArt.typeArray2d(ascii_arr, this);
      tint(255, (micLevel*20) / 256 * 150 + 20);
      console.log(micLevel*50)
      image(myCapture, 0, 0, width, height);
      printPoem(1)
  } else {
    background(255, 0, 0);
  }
}

function mouseClicked() {
 
}
   
function printPoem(time){

  wordCounter = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length

  textAlign(CENTER, CENTER); textFont('monospace', textSize); textStyle(BOLD);
  thetext = poemGenerate.split(" ").splice(0,wordCounter).join(" ")
  fill(255, 255, 255);
  text(thetext,32,16,windowWidth-32);
  
}


function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    // let fs = fullscreen();
    fullscreen(true);
    background(0,0,0);  
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}