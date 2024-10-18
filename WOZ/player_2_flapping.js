//global variables
let scalar = 1.0001;
let width_object;
let height_object;
let old_width;
let old_height;
let width_difference = 0;
let height_difference = 0;
let game_ended = false;
let font_custom;
let game_state = 'prestart';
let start_button;


// assets
let cliff;
let background_img;
let boy;
let yellow_wing;
let pink_wing;
let rope;
let whoosh;
let bgm;


function preload() {
  cliff = loadImage('assets/cliff.jpg');
  background_img = loadImage('assets/starry_night.jpg')
  font_custom = loadFont('AgendaKing.otf');
  yellow_wing = new wing('assets/yellow_wing.png', 0, 0, -30);
  pink_wing = new wing('assets/pink_wing.png', -200, 0, 30);
  boy = loadImage('assets/da_boy.png');
  rope = loadImage('assets/rope.png');
  
  //sounds
  soundFormats("mp3");
  whoosh = loadSound('assets/whoosh_sound_effect');
  bgm = loadSound('in-deep-distress-112438.mp3');
  
  
}


function setup() {
  createCanvas(800, 800);
  width_object = width;
  height_object = 2*height/3;
  angleMode(DEGREES)
  
  start_button = createButton('start');
  start_button.size(200, 100); 
  start_button.position(width / 2 - start_button.width / 2, height / 2 -   start_button.height / 2);
  start_button.style('font-size', '20px');
  start_button.mousePressed(onButtonClick);
  //textFont(font_custom);
}

function draw() {
  background(background_img);
  if (game_state == 'playing') {
    moveTowardsCliff();

    push();
    translate(width/2+100, 600);
    rotate(yellow_wing.rotationAngle);
    yellow_wing.display()
    pop();

    push();
    translate(width/2-100, 600);
    rotate(pink_wing.rotationAngle);
    pink_wing.display();
    pop();

    yellow_wing.rotateWing();
    pink_wing.rotateWing();
  }
}


function onButtonClick() {
  start_button.hide();
  bgm.play();
  bgm.setVolume(0.1);
  bgm.loop();
  // Add your code here to be executed when the button is clicked
  game_state = "playing";
}

function moveTowardsCliff() {
  image(cliff, -width_difference/2, height_difference/2 + 2*height/3, width_object, height_object);
  image(rope, width/2-10, height_difference/2 + 2*height/3 - 40, 20, height_object+30);
  old_width = width_object;
  old_height = height_object;
  width_object = width_object * scalar;
  height_object = height_object * scalar;
  width_difference += width_object - old_width;
  height_difference += height_object - old_height;
  if (!game_ended) {
    if (keyIsDown(UP_ARROW)) {
      scalar = 1.002;
    }  else {
      scalar = 1.000;
    }
  }
  image(boy, width/2-60, height-230, 120, 120);
  if (width_difference > 300) {
    game_ended = true;
    scalar = 1;
    fill(255);
    textSize(20);
    textFont()
    let text_value = 'YOU MADE IT';
    let text_width = textWidth(text_value);
    text('YOU MADE IT', (width-text_width)/2, height/3);
  }
}
 
class wing {
  constructor(img_string, x, y, rotationTarget) {
    this.img = loadImage(img_string);
    this.x_position = x; 
    this.y_position = y; 
    this.beatState = 0;
    this.rotationTarget = rotationTarget;
    this.rotationAngle = 0;
  }
  display() {
    image(this.img, this.x_position, this.y_position, 200, 200);
  }
  
  set_state(state_number) {
    this.beatState = state_number;
  } 
  
  rotateWing() {
    if (this.beatState == 1) {
      this.rotationAnimation(this.rotationTarget);
    } else if (this.beatState == 2) {
      this.rotationAnimation(0);
    }
  }
  rotationAnimation(targetAngle) {
    let easing = 0.3;
    let diff = targetAngle - this.rotationAngle;
    if (abs(diff) > 1) {
      this.rotationAngle += diff * easing;
    } else {
        this.rotationAngle = targetAngle;
      if (this.beatState == 1) {
        this.beatState = 2;
      } else if (this.beatState == 2) {
        this.beatState = 0;
      } 
    }
  }
}

function backgroundMusic(){
  
  bgm.play();
  bgm.loop();
  bgm.setVolume(0.3);
  userStartAudio();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    whoosh.play();
    whoosh.setVolume(0.1);
    whoosh.rate(2);
    value = 255;
    yellow_wing.set_state(1);
    pink_wing.set_state(1);
  } else if (keyCode === LEFT_ARROW) {
    whoosh.play();
    whoosh.setVolume(0.1);
    whoosh.rate(2);
    pink_wing.set_state(1);
  } else if (keyCode === RIGHT_ARROW) {
    whoosh.play();
    whoosh.setVolume(0.1);
    whoosh.rate(2);
    yellow_wing.set_state(1);
  }
}