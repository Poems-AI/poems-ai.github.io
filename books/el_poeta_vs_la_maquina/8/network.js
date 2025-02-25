let poemGenerate=[];
let wordCounter=0;
let speed = 1250;
let poemWords;
let startTime = Math.ceil((Date.now() / speed))
let word =""
let map = {}


function preload() {
  poemGenerate = loadStrings('inimitables.es.AI.txt');
}

function generateMap(words){
  words.forEach(element => {
    map[element] = {x: Math.floor(Math.random()*windowWidth),y:Math.floor(Math.random()*windowHeight) }
  });
  
}

function setup() {
  poemGenerate=poemGenerate[poemGenerate.length-1]
  print 
  poemWords = poemGenerate.split(" ")

  generateMap(poemWords)

  if ( window.location.href == "https://www.artpoet.io/index.en.html" || window.location.hostname == "https://www.artpoet.io/index.es.html" ){
    cnv=createCanvas(500, 900)
    console.log("si estoy pasando por el ajuste del canvas")
  } else {
    cnv=createCanvas(windowWidth, windowHeight)
    console.log("si estoy pasando por el ajuste del canvas")
    console.log(window.location.href)
  }
  
  textAlign(CENTER, CENTER); textFont('monospace', 16); textStyle(BOLD)

  strokeWeight(2); fill(100)
  frameRate(30)
}


function draw() {
    background(0);
    printNetwork(word)
    word = printwords()
}

function printNetwork(word){
  let previousPoint = {x:windowWidth/2,y:windowHeight}
  textSize(16)
  Object.keys(map).forEach(element => {
    if (word == element ){
      textSize(64)
      fill(150)
      strokeWeight(20)
      stroke(150,150,150,50);

    } else{
      textSize(16)
      strokeWeight(2)
      fill(140, 140, 140)
      stroke(50,50,50,120);
    }
    map[element].x = (map[element].x + element.length/4) % windowWidth
    map[element].y = (map[element].y + element.length/4) % windowHeight

    line(previousPoint.x, previousPoint.y, map[element].x, map[element].y);
    previousPoint.x = map[element].x
    previousPoint.y = map[element].y
   
    text(element.replace(',',''),map[element].x,map[element].y)

  });
}

function printwords(){

  wordCounter = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length

  textFont('monospace', 64);
  fill(255, 255, 255)
  text(poemWords[wordCounter].replace(",","").replace("!"," ").replace("¡"," ").replace("¿"," ").replace("?"," "),0,windowHeight/2,windowWidth)
  return poemWords[wordCounter]
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