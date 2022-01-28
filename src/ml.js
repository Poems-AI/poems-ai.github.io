let x = 8, y = 8;

let weights = [];

let originalPoem = [];
let poemGenerate = [];

let listOfWords = [];
let aux = [];

let originWord = "";
const originWordSize = 8;
let originWordNextPositionInY = originWordSize + 1;
let text_print =""

let speed = 350

let startTime = Math.ceil((Date.now() / speed))

const rnn = ml5.charRNN('models/es/');


function preload() {
  originalPoem = loadStrings('poems/picasso_in_botswana.en.txt');
  poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  input = createInput();
  input.position(20, 65);
  
  button = createButton('generate');
  button.position(input.x + input.width, 65);
  button.mousePressed(generate);

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
  background(0)
  textSize(36)
  text(text_print,130, 130);
  
}

function mouseClicked() {
 
}


function generate() {
  text_print = input.value();
  rnn.generate({ seed: text_print }, (err, results) => {
    console.log(results)
    text_print = results.sample;
  });
}


function center_box(x,y, texto){
  fill("black")
  rect(windowWidth/2-130, windowHeight/2-130, 260, 260);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(0, 102, 153);
  textSize(36)
  text(texto, x+130, y+130);
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
 
  backTextSize = 3;

  word = listOfWords[number]
  center_box(windowWidth/2-130,windowHeight/2-130,word) ;
  iniText = ""


  for (let i = 0; i < number ; i++){
    iniText += listOfWords[i];
  }

  originWord = iniText+ " " +listOfWords[number];
  textSize(7);
  originWordNextPositionInY = number * backTextSize + backTextSize;
  backgroundText(originWord, backTextSize, 0 , originWordNextPositionInY, 'white');

  
  aux = poemGenerate[number];
  backgroundText(aux.slice(originWord.length), backTextSize, textWidth(originWord)+ 3,  originWordNextPositionInY, "red");
  
}

function printPoems(){
  
  line = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length;

  poem(line);

  if (line === listOfWords.length + 1){
    finish()
    noLoop();
  }

}

// function mousePressed() {
//   if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
//     // let fs = fullscreen();
//     fullscreen(true);
//     startTime = Math.ceil((Date.now() / speed))
//     background(0,0,0);  
//   }
// }



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
