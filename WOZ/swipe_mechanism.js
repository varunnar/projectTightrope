let bats_caught = 0;
let boy_hit = 0;
let press_frame = 0;
let jumpHeight = 20;
let jumpDuration = 300; // in milliseconds
let jumpStartTime;
let leftJump = true;
let batArray = [];
let game_state = 'start';
let start_button;

//images
let backgroundImg;
let owl;
let owlImg;
let boy;
let rope;

//sound effects
let attack_sound;
let bat_sound;
let bgm;

function preload() {
  backgroundImg = loadImage('background_page.png');
  owlImg = loadImage('yellow_owl.png');
  boy = loadImage('da_boy.png');
  rope = loadImage('rope.png');
  
  soundFormats("mp3");
  attack_sound = loadSound('attack_sound_effect');
  bat_sound = loadSound('bonk');
  bgm = loadSound('in-deep-distress-112438');
}


function setup() {
  createCanvas(800, 550);
  rectMode(CENTER);
  
  owl = {
    x: width / 2,
    y: 350,
    image_object: '',
    size: 20
  };
  
  start_button = createButton('start');
  start_button.size(200, 100); 
  start_button.position(width / 2 - start_button.width / 2, height / 2 -   start_button.height / 2);
  start_button.style('font-size', '20px');
  // Attach a function to be called when the button is clicked
  start_button.mousePressed(onButtonClick);
}

function draw() {
  background(backgroundImg);
  
  if (game_state == 'playing') {
    image(rope, width/2+35, -100, 15, height+100)
    image(boy, width/2-50, height-150, 200, 200);

    fill(255);
    text("Bats hit: " + bats_caught, 20, 20);

    fill(255);
    text("The boy has been hit: " + boy_hit, 20, 35);

    owl_batting();

    for (let j = 0; j < batArray.length; j++) {
      batArray[j].update();
      batArray[j].display();

      // Remove batArray that are off-screen
      if (batArray[j].reachedMiddle()) {
        boy_hit += 1;
        batArray.splice(j, 1);
      }
    }

    // Create batArray at random intervals from the left and right
    if (frameCount % 60 === 0) {
      if (random() > 0.5) {
        //batArray.push(new Enemy(-70, random(height - 70)));
        batArray.push(new batEnemy(true));
      } else {
        //batArray.push(new Enemy(width, random(height - 70)));
        batArray.push(new batEnemy(false));
      }
    }
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

function slap_check() {
  for (let i = 0; i < batArray.length; i++) {
   // console.log(batArray[i].get_x_position());
    if (dist(owl.x, 450, batArray[i].get_x_position(), 450) < 40) {
      console.log("collision");
      bat_sound.play();
      bat_sound.setVolume(0.3);
      batArray.splice(i, 1);
      bats_caught  += 1;
    }
  }
}

function owl_batting() {
  owl.image_object = image(owlImg, owl.x, owl.y, 80, 80);
  
  if (jumpStartTime && millis() - jumpStartTime < jumpDuration) {
    // Calculate the progress of the jump
    if (leftJump) {
      owl.x -= 10;
      slap_check();
    } else {
      owl.x += 10;
      slap_check();
    }
  } else {
    // If not in the jump phase, simulate gravity to bring the owl down
    if (leftJump) {
      owl.x += 10;
    } else {
      owl.x -= 10;
    }
    
    
    // Reset the owl's position when it reaches the ground\
    if ((owl.x >= width/2 && leftJump) || (owl.x <= width/2 && !leftJump)) {
      owl.x = width/2;
    } else {
      slap_check();
    }
  }
}

function keyPressed() {
  // Check if the owl is on the ground before allowing a jump
  if (owl.x === width/2) {
    jumpStartTime = millis(); 
    if (keyCode == LEFT_ARROW) {
      leftJump = true;
      attack_sound.play();
      attack_sound.setVolume(0.3);
    } else if (keyCode == RIGHT_ARROW) {
      leftJump = false;
      attack_sound.play();
      attack_sound.setVolume(0.3);
    }
    // Set the jump start time
    // Give the owl an initial upward velocity for the jump
  }
}

class batEnemy {
  constructor(left) {
    this.batImg = loadImage('evil_bat.png');
    this.left = left;
    this.y_position = 350;
    if (left) {
      this.x_position = -70;
    } else {
      this.x_position = width;
    }
    this.width = 80;
    this.height = 80;
    this.speed = 5;
  }
  
   update() {
    // Move towards the middle of the canvas
    let targetX = width / 2;
    if (this.x_position < targetX && this.left == true) {
      this.x_position += this.speed;
    } else if (this.x_position > targetX && this.left == false) {
      this.x_position -= this.speed;
    }
  }
  
  display() {
    fill(255, 0, 0);
    //rect(this.x, this.y, this.width, this.height);
    image(this.batImg, this.x_position, this.y_position, this.width, this.height);
  }

  get_x_position() {
    return this.x_position;
  }
  get_y_position() {
    return this.y_position;
  }  
  // offScreen() {
  //   // Check if the enemy is off-screen
  //   return this.x_position > width || this.x_position + this.width < 0;
  // }
  
  reachedMiddle() {
    // Check if the enemy reached the middle of the canvas
    return abs(this.x_position - width / 2) < 10;
  }
 }