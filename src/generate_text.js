let poemGenerate=[]
let wordCounter=0
let speed = 700
let poemWords = []
let originalPoems=''
let startTime = Math.ceil((Date.now() / speed))
let word =""
let map = {}
let size = 2
let faceapi
let video
let detections
let lastDetections = {}
let textSize = 13

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
  MODEL_URLS: {
    Mobilenetv1Model: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json',
  },
}

function preload() {
  poemGenerate = loadStrings('poems/'+get_poem_name()+'.AI.txt');
}

function setup() {
  originalPoems=poemGenerate[poemGenerate.length-1]
  poemWords = originalPoems.split(" ")
  cnv=createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER); textFont('monospace', textSize); textStyle(BOLD)
  strokeWeight(2); fill(100)

  video = createCapture(VIDEO);
  video.size(width, height);
  faceapi = ml5.faceApi(video, detection_options, modelReady)

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas

  frameRate(9)
}

function draw() {
    wordCounter = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length

    // background(0)
    printPoems(wordCounter)
    
    faceapi.detect(gotResults)
}

function modelReady() {
    // console.log('ready!')
    // console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    if(lastDetections != {}){
      stroke(0)
      drawLandmarks(lastDetections)
      stroke(255)
    }


    detections = result;
    if (detections) {
        if (detections.length > 0) {
            drawLandmarks(detections)
            lastDetections = detections
        }else{
          drawLandmarks(lastDetections)
        }
    }else{
      drawLandmarks(lastDetections)
    }
    
}

function drawLandmarks(detections){

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth; 
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);

    }

}

function drawPart(feature, closed){

    strokeWeight(10)
    noFill();
    beginShape();

    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x * size - windowWidth/2
        const y = feature[i]._y * size - windowHeight/3
        vertex(x, y)
    }
    
    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }
    
}

function printPoems(lastOne){
  textFont('monospace', textSize); textStyle(BOLD)
  poemsToPrint = poemGenerate[lastOne]

  fill(lastOne+100)
  stroke(0)
  strokeWeight(4);
  
  text(poemsToPrint.split("~").join("\n"),0,32,windowWidth)

}

function printPoems_old(lastOne){
  textFont('monospace', textSize); textStyle(BOLD)
  poemsToPrint = poemGenerate.slice(0, lastOne)
 
  let opacitysteps =  poemWords.length / wordCounter
  let opacity = opacitysteps
  stroke(4)
  strokeWeight(4);
  poemsToPrint.forEach(element => {
    fill(255, opacity )
    text(element,0,32,windowWidth)
    opacity +=  opacitysteps
  });
}


function printwords(){

  textFont('monospace', 64);
  fill(255, 255, 255)
  text(poemWords[wordCounter],0,windowHeight,windowWidth)
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