let x = 8, y = 8;

let weights = [];

let originalPoem = [];
let poemGenerate = [];

let listOfWords = [];
let aux = [];

let originWord = "";
const originWordSize = 8;
let originWordNextPositionInY = originWordSize + 1;

let speed = 900

let startTime = Math.ceil((Date.now() / speed))

function preload() {
  const poemName  = get_poem_name();
  originalPoem = loadStrings('poems/'+ poemName +'.txt');
  poemGenerate = loadStrings('poems/'+ poemName +'.AI.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace', 8);
  textLeading(21);
  textAlign(LEFT);
  textStyle(NORMAL);
  background(0,0,0);
  fill(220);

  for (let i = 0; i < originalPoem.length ; i++){ 
    aux = originalPoem[i].split(" ");
    for (let j = 0; j < aux.length ; j++){
      if (!(aux[j] === "")){
        listOfWords.push(aux[j]);
      }
    }
  }
}

function draw() { 
  printPoems()
}
   
function center_box(x,y, texto){
  fill("black")
  rect(x, y, 260, 260);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(0, 102, 153);
  textSize(36)
  text(texto.replace(",","").replace(".",""), x+130, y+130);
  noFill();
  stroke('white');
  strokeWeight(4);
  rect(x, y, 260, 260);
}

function backgroundText(originWord, originWordSize , x, y, font_color){
  noStroke();
  textAlign(LEFT);
  fill(font_color);
  textSize(originWordSize)
  text(originWord, x, y);
}

function poem(number){
 
  backTextSize = 4;

  word = listOfWords[number]
  center_box(windowWidth/2-130,windowHeight/2-130,word) ;
  iniText = ""

  for (let i = 0; i < number ; i++){
    iniText = iniText +" "+listOfWords[i];
  }

  originWord = iniText+ " " +listOfWords[number];
  textSize(7);
  originWordNextPositionInY = number * backTextSize + backTextSize;
  backgroundText(originWord, backTextSize, 0 , originWordNextPositionInY, 'white');

  aux = poemGenerate[number];
  backgroundText(aux.slice(originWord.length).replace("^^ ","").replace("^ ",""), backTextSize, textWidth(originWord)+ 3,  originWordNextPositionInY, "red");
  
}

function printPoems(){
  
  line = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length;

  poem(line);

  if (line === listOfWords.length - 1){
    finish()
    noLoop();
  }

}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    // let fs = fullscreen();
    fullscreen(true);
    startTime = Math.ceil((Date.now() / speed))
    background(0,0,0);  
  }
}


function finish(){
  background(0,0,0);
  originWord = ''
  for (let i = 0; i < listOfWords.length ; i++){
    
    originWord = originWord+ " " +listOfWords[i];
    textSize(7);
    originWordNextPositionInY = i * backTextSize + backTextSize;
    backgroundText(originWord, backTextSize, 0 , originWordNextPositionInY, 'white');

    aux = poemGenerate[i];
    backgroundText(aux.slice(originWord.length).replace("^^ ","").replace("^ ",""), backTextSize, textWidth(originWord)+ 3,  originWordNextPositionInY, "red");
  }

  center_box((windowWidth/5)*4-130,(listOfWords.length*4)/5-130, "IA")
  center_box(windowWidth/5-130,((listOfWords.length*4)/5)*4-130, "HUMANO")

  // center_box((windowWidth/5)*4-130,windowHeight/5-130, "IA")
  // center_box(windowWidth/5-130,(windowHeight/5)*4-130, "HUMANO")

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
