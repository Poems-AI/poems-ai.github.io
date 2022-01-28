// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let video;
let poseNet;
let poses = [];
let people = [];
let scale = 8
let t1 = {}



let PoseNetOptions ={
    architecture: 'MobileNetV1',
    imageScaleFactor: 0.1,
    outputStride: 16,
    flipHorizontal: false,
    minConfidence: 0.5,
    maxPoseDetections: 10,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    detectionType: 'multiple',
    // inputResolution: 257,
    multiplier: 0.75,
    quantBytes: 2,
  };

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(20)
  // createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth/scale, windowHeight/scale);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, PoseNetOptions, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected 
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  t1 = createGraphics(200, 200);
  t1.textSize(12)

  people.push(t1);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(0);
  // background(0,255,0);
  image(video, 100, -100, 100+width/scale*2,  height/scale*2.5);

  drawPeople();
}

function drawPlane(pos, rot, size, text, textSize){
  offset = 500
  push();
  blendMode(SCREEN);
  t1.background(0)
  t1.fill(255)
  t1.textSize(textSize) 
  t1.text(text, 1, 1, 200, 200 );
  t1.textAlign(CENTER);
  texture(t1);
  translate(pos.x-offset/8, pos.y-offset/8, offset);
  rotateZ(rot);
  stroke(255)
  strokeWeight(0.1)
  noStroke();

  plane(size);
  pop();

}

function drawElement(pos){
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(pos.x*scale - windowWidth/2,  pos.y*scale - windowHeight/2, 10, 10);
    pop();  
}

function drawPeople()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // console.log(poses)

    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // console.log(pose.score)
    if (pose.score < 0.2){
      break
    }
    if ('nose' in pose && 'rightEye' in pose && 'leftEye' in pose){
      size = 30
      text = "burn after selling"
        angle = (pose.rightEye.y - pose.leftEye.y)/(pose.rightEye.x - pose.leftEye.x)
        drawPlane(pose.nose,angle, size, text, 50)
    }

    if ('rightShoulder' in pose && 'leftShoulder' in pose){
      // position = {x:pose.nose.x + (pose.rightShoulder.x-pose.leftShoulder.x)/2,
      size = 50
      text = `I can’t believe you idiots are buying this Banksy
      Baring witness is participating,
      two hundred grams of aluminum and glass`
      position = {x:pose.nose.x,
                  y: pose.nose.y + (pose.rightShoulder.y-pose.leftShoulder.y)/2 + size}
      angle = (pose.rightShoulder.y - pose.leftShoulder.y)/(pose.rightShoulder.x - pose.leftShoulder.x)
  
      // drawElement(pose.rightShoulder)
      // drawElement(pose.leftShoulder)
      drawPlane(position,angle, size,text, 20)

  }
    // if ('rightEye' in pose){
   
    // }
    // if ('leftEye' in pose){
       
    // }
    // for (let j = 0; j < pose.keypoints.length; j++) {
    //   // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    //   let keypoint = pose.keypoints[j];
    //   // Only draw an ellipse is the pose probability is bigger than 0.2
    //   if (keypoint.score > 0.8) {
    //     fill(255, 0, 0);
    //     noStroke();
    //     ellipse(keypoint.position.x*scale, keypoint.position.y*scale, 10, 10);
    //   }
    // }
  }
}




`

0: {score: 0.9964547157287598, part: 'nose', position: {…}}
1: {score: 0.999004065990448, part: 'leftEye', position: {…}}
2: {score: 0.997344434261322, part: 'rightEye', position: {…}}
3: {score: 0.8774033784866333, part: 'leftEar', position: {…}}
4: {score: 0.403746634721756, part: 'rightEar', position: {…}}
5: {score: 0.1694273054599762, part: 'leftShoulder', position: {…}}
6: {score: 0.767784595489502, part: 'rightShoulder', position: {…}}
7: {score: 0.051434263586997986, part: 'leftElbow', position: {…}}
8: {score: 0.0011886515421792865, part: 'rightElbow', position: {…}}
9: {score: 0.3409200608730316, part: 'leftWrist', position: {…}}
10: {score: 0.01220095157623291, part: 'rightWrist', position: {…}}
11: {score: 0.006864831317216158, part: 'leftHip', position: {…}}
12: {score: 0.030890192836523056, part: 'rightHip', position: {…}}
13: {score: 0.006473998539149761, part: 'leftKnee', position: {…}}
14: {score: 0.022823795676231384, part: 'rightKnee', position: {…}}
15: {score: 0.008379606530070305, part: 'leftAnkle', position: {…}}
16: {score: 0.005026040133088827, part: 'rightAnkle', position: {…}}
length: 17



keypoints: (17) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
leftAnkle: {x: 80.70167686827916, y: 105.26204968055399, confidence: 0.008379606530070305}
leftEar: {x: 81.4904809811004, y: 35.67281193399244, confidence: 0.8774033784866333}
leftElbow: {x: 119.87036789437677, y: 97.64769659153683, confidence: 0.051434263586997986}
leftEye: {x: 70.3011232442893, y: 30.916870992935124, confidence: 0.999004065990448}
leftHip: {x: 94.08430355161082, y: 105.31635089792631, confidence: 0.006864831317216158}
leftKnee: {x: 87.26748195696435, y: 98.6611098575221, confidence: 0.006473998539149761}
leftShoulder: {x: 96.44620807022437, y: 62.93802275453561, confidence: 0.1694273054599762}
leftWrist: {x: 98.37851844038018, y: 74.21983601239869, confidence: 0.3409200608730316}
nose: {x: 63.256586735350616, y: 37.88263587357933, confidence: 0.9964547157287598}
rightAnkle: {x: 44.093216439629344, y: 105.2937448572092, confidence: 0.005026040133088827}
rightEar: {x: 50.845587436327214, y: 42.06693956742955, confidence: 0.403746634721756}
rightElbow: {x: 34.36916021985303, y: 106.16388953056781, confidence: 0.0011886515421792865}
rightEye: {x: 55.76974495468437, y: 32.60420783206183, confidence: 0.997344434261322}
rightHip: {x: 36.60229623874338, y: 100.14414073428291, confidence: 0.030890192836523056}
rightKnee: {x: 45.07525401542159, y: 96.44609674683805, confidence: 0.022823795676231384}
rightShoulder: {x: 37.96197133908476, y: 71.49306160153583, confidence: 0.767784595489502}
rightWrist: {x: 42.9939402485636, y: 91.03925557080875, confidence: 0.01220095157623291}
score: 0.3351392660440658
`