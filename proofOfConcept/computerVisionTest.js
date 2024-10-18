// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

let video;
let poseNet;
let pose;
let skeleton;
let ball;
let ballImg; // Variable for the ball image


let brain;
let poseLabel = "N";

function preload() {
  ballImg = loadImage('grass.png'); // Make sure to replace this with the actual path to your image
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  ball = { x: width / 2, y: height / 2, size: 100 };
  


  let options = {
    inputs: 34,
    outputs: 3,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  //console.log(results[0].confidence);
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  background(255); // Set the background to white
  push();
  translate(video.width, 0);
  scale(-1, 1);
  //image(video, 0, 0, video.width, video.height);
  image(ballImg, ball.x, ball.y, 40, 40); // Adjust the size as needed


  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      //strokeWeight(2);
      //stroke(0);

      //line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      //fill(0);
      //stroke(255);
      //ellipse(x, y, 8, 8);
      moveBallBasedOnPrediction(); // Call this function to check the pose label and move the ball

    }
  }
  pop();
  
function moveBallBasedOnPrediction() {
  interpretPredictions(); // Interpret the predictions to adjust the ball's position
}

function interpretPredictions() {

    if (poseLabel === 'R') {
      moveBallLeft();
    } else if (poseLabel === 'L') {
      moveBallRight();
    }
  }

function moveBallLeft() {
  if (ball.x>0) {
  ball.x = max(ball.x - 1, 0); // Move the ball left
  }
}

function moveBallRight() {
  ball.x = min(ball.x + 1, 600); // Move the ball right
}

  //fill(255, 0, 255);
  //noStroke();
  //textSize(512);
  //textAlign(CENTER, CENTER);
  //text(poseLabel, width / 2, height / 2);
}