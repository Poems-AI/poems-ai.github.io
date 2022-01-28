let x = 8, y = 8
let poemcount=0;
let weights = []
let poemsBranch = []
let poemsLength = 0
let poemWords = 0
let movement =0 
let speed = 1750
let startTime = Math.ceil((Date.now() / speed))
let sin = []
let shift = 0.9
let treeHight = 4

function preload() {
  poemGenerate = loadStrings('poems/'+get_poem_name()+'.AI.txt');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  originalPoem=poemGenerate[poemGenerate.length-1]
  poemWords = originalPoem.split(" ")
  frameRate(30)
  textAlign(CENTER, CENTER); textFont('monospace', 16); textStyle(BOLD)

  for(x=0;x<360;x++){
    sin.push(Math.sin(x))
  }
  poemsBranch = calculateDistance(poemGenerate)
  poemsLength = poemsBranch.length
  // distances = [[0,0,2,1,2,2,3,1,1,1,1,0,0,1,-1,-4,-4]]
}

function draw() {
  // background(50, 30, 40);
  background(0);
  fill(0);
  // text(poemGenerate.join("\n"), 0, 0, windowWidth, windowHeight);
  poemcount = (Math.ceil((Date.now() / speed)) - startTime) % poemsLength
  drawTree(poemcount)
  // drawTreeInvert(poemcount)
  // movement =  Math.ceil((Date.now() /100 % 20))
  movement =  Math.ceil(Math.sin((Date.now() /10 ) ))
  
  printwords(poemcount)

}

function printwords(poemcount){
  textFont('monospace', 64);
  strokeWeight(2)
  stroke(0,0,0)
  fill(255, 255, 255)
  text(poemWords[poemcount].replace(",","").replace(".",""),0,windowHeight/2,windowWidth)
  return poemWords[poemcount]
}


function createLine(points, strokeLevel, opacity){
  noFill();
  color = 50+(opacity)%poemsLength 
  // stroke(color,color,color,opacity % 400 );
  stroke(color,color,color,color+100 );
  strokeWeight(2)
  // strokeWeight(strokeLevel+(200-opacity)/15);
  beginShape();
  for(point in points){
    posy = points[point][1]
    posx = points[point][0]
    vertex(posx,posy);
    // vertex(posx+(windowHeight-posy),posy);
    // vertex(posx+(movement * (windowHeight- posy) /400)* Math.sin(movement*posy)/5 ,posy);
    // vertex(posx+( Math.sin((windowHeight-posy) * movement  )*3) ,posy);
    // vertex(posx+(movement * Math.sin((windowHeight-posy)/ 36000 )*150) ,posy);
    // sinvalue = sin[posy % 360]
    // vertex(posx+(movement * sinvalue *(windowHeight - posy)*0.01) ,posy);
  }

  endShape();
}


function calculateWeights(poems){
  let poemsWeights = []

  poems.forEach(element => {
    words_lenght = []
    element.split(" ").forEach(word => {
      words_lenght.push(word.length)
    });
    poemsWeights.push(words_lenght)
  });

  return poemsWeights
}

function calculateDistance(poems){
  poemdistances = []
  poemsWeights = calculateWeights(poems)

  original = poemsWeights[poemsWeights.length-1]

  poemsWeights.forEach(line =>{
    
    for(word in line){
      line[word]=line[word] - original[word]*shift
    }
    poemdistances.push(line)
  })

  // console.log(poemdistances)
  return poemdistances
}

function generateBranch(toLine, xpos, ypos, width, height, orientation){
  branchPoints =  []
  lastPoint = 0
  point = [xpos, ypos]
  branchPoints.push(point)
  angle = 0
  toLine.forEach((element, index) => {
      
      // V2
      angle = (element+angle)
      lastPoint += (Math.atan(angle/Math.PI))*(toLine.length-index)

      point = [(lastPoint * width) + xpos, ypos-index*orientation*height]

      // // V1
      // lastPoint += element*width
      // point = [lastPoint + xpos, ypos -index*height ]

      branchPoints.push(point)
  })
  return branchPoints
}

function drawTree(count){

  xpos = windowWidth/2
  ypos = windowHeight
  sub = poemsBranch.slice(0,count)
   // TODO: all the lines
  sub.forEach((distances, index) =>{
    // branchPoints = generateBranch(distances, xpos, ypos, 5, 3.5)
    branchPoints = generateBranch(distances, xpos, ypos, 0.02, treeHight, 1 ) // V2
    createLine(branchPoints,2*(250-index)/100, index) // V1
    // createCurve(branchPoints,1)
    
  })
  
}

function drawTreeInvert(count){

  xpos = windowWidth/2
  ypos = 0
  sub = poemsBranch.slice(0,count)
   // TODO: all the lines
  sub.forEach((distances, index) =>{
    // branchPoints = generateBranch(distances, xpos, ypos, 5, 3.5)
    branchPoints = generateBranch(distances, xpos, ypos, 0.02, 2 ,-1) // V2
    createLine(branchPoints,2*(250-index)/100, index) // V1
    // createCurve(branchPoints,1)
    
  })
  
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