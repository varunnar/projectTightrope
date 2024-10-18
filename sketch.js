//image objects
let boy;
let rope;
let background_img_scroll;
let background_img_scroll_dark;

let background_position_1 = 0;
let background_width;
let background_height;
let background_position_2;
let play_button;
let final_vid;
let resources;

//arrow files
let arrow_1;
let arrow_2;
let arrow_3;
let arrow_4;

let light_orb;
let dark_orb;

//tutorial screens
let intro_screen;
let tutorial_1_1;
let tutorial_1_2;
let tutorial_1_3;
let tutorial_1_4;
let tutorial_2_1;
let tutorial_2_2;
let tutorial_2_3;
let tutorial_2_4;
let ready_screen;
let arrow_tutorial;

//fonts
let player_1_font;
let player_2_font;

//characters
let owl;
let owl2;

//audio assets
let bgm;
let negHitSound;
let posHitSound;
let swoosh;
let cell_phone_track;

//VO
let vo_game_state_1;
let vo_game_state_2;
let vo_game_state_3;
let vo_game_state_4;
let vo_game_state_6;
let vo_game_state_7;

//variables
let rotation_angle = 0; 
let text_array = [];
let emotion_array = [];
let start_button;
let opacity_value = 255;
let tutorial_hits = 0;
let blur_counter = 13;
let tutorial_time;

// person input values
let mic;
let recorder;
let joy_filled_value;
let fear_filled_value;
let joy_recording = false;
let fear_recording = false;
let joy_string = '';
let fear_string = '';
let light_input;
let dark_input;

//game states
let game_state_counter = 0;

//Game state options
let GSO = {
  "BEFORE_PLAYING": "before_playing",
  "STORY_1": "story_1",
  "STORY_2": "story_2",
  "STORY_3": "story_3",
  "STORY_4": "story_4",
  "STORY_5": "story_5",
  "EMOTION_GENERATION": "emotion_generation",
  "TUTORIAL_1_IMG_1":  "tutorial_1_img_1",
  "TUTORIAL_1_IMG_2":  "tutorial_1_img_2",
  "TUTORIAL_1_IMG_3":  "tutorial_1_img_3",
  "TUTORIAL_1_IMG_4":  "tutorial_1_img_4",
  "TUTORIAL_1_1_L": "tutorial_1_1_r",
  "TUTORIAL_1_1_R": "tutorial_1_1_l",
  "TUTORIAL_1_2": "tutorial_1_2",
  "TUTORIAL_2_IMG_1":  "tutorial_2_img_1",
  "TUTORIAL_2_IMG_2":  "tutorial_2_img_2",
  "TUTORIAL_2_IMG_3":  "tutorial_2_img_3",
  "TUTORIAL_2_IMG_4":  "tutorial_2_img_4",
  "TUTORIAL_2_1": "tutorial_2_1",
  "TUTORIAL_2_2": "tutorial_2_2",
  "READY": "ready",
  "GAME": "game",
  "ENDING_1": "ending_1",
  "ENDING_2": "ending_2",
  "RESOURCE_LIST": "ending_resources"
}

let game_states_array = Object.values(GSO);
let current_state = game_states_array[game_state_counter];

//hit variables
let good_object_hit = 0;
let bad_object_hit = 0;
let last_hit_time;
let last_hit_negative = false;

function setup() {
  createCanvas(1200, 800);
  angleMode(DEGREES);
  
  owl = new player23(width/2-140, 300, 1);
  owl2 = new player23(width/2+140,300, 2);
  this.imageMode(CENTER);
  background_position_2 = -width*4; 
  
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  
  joy_filled_value = new p5.SoundFile();
  fear_filled_value = new p5.SoundFile();
  // push();
  // light_input = createInput();
  // textSize(30);
  // light_input.hide();
  // dark_input = createInput();
  // dark_input.hide();
  // textSize(30);
  // pop();
  
  final_vid = createVideo('assets/final_vid.mp4');
  final_vid.size(800, 800);
  final_vid.loop();
  final_vid.hide();
}

function draw() {
  current_state = game_states_array[game_state_counter];
  moveGameState();
  if (isInitialNarrative() || isEndNarrative() || current_state == GSO.RESOURCE_LIST) {
    background(0);
  }
  else {
  //if (!isInitialNarrative() && !isEndNarrative()) {
    moveBackground();
  }
  
  showTutorialScreens() 
  
  let hit = false;
  
  if (isTutorial() || current_state == GSO.GAME || current_state == GSO.STORY_2 || current_state == GSO.STORY_3 || current_state == GSO.STORY_4 || current_state == GSO.STORY_5) {
    image(rope, width/2, height/2, 15, height+200)
  }  
  if (current_state == GSO.GAME) {
    textSize(20);
    fill(255);
    text('Good orbs hit: ' + good_object_hit, 10, 30);
    text('Bad orbs hit: ' + bad_object_hit, 10, 60);
  }
  if (current_state == GSO.TUTORIAL_1_1_L) {
    image(arrow_2, width/2-100,height-100, 60, 30);
    if (rotation_angle == -45) {
      iterateGameStateCounter();
    }
  }
  if (current_state == GSO.TUTORIAL_1_1_R) {
    image(arrow_1, width/2+100,height-100, 60, 30);
    if (rotation_angle == 45) {
      iterateGameStateCounter();
    }
    tutorial_time = millis();
  }
  if (current_state == GSO.TUTORIAL_1_2) {
      //if (opacity_value < 215) {
    if ((millis() > tutorial_time + 10000) && opacity_value <= 215) {
      opacity_value = 255;
      iterateGameStateCounter();
    }
  }
  if (current_state == GSO.TUTORIAL_2_1) {
    image(arrow_4, width/2-220, 300, 30, 70);
    image(arrow_4, width/2+50, 300, 30, 70); 
    if (owl.tutorial_state(true) && owl2.tutorial_state(true)) {
      owl.setGlowColor(false, 100);
      owl2.setGlowColor(false, 100);
      iterateGameStateCounter();
    }
  } else if (current_state == GSO.TUTORIAL_2_2) {
    image(arrow_3, width/2-50, 300, 30, 70);
    image(arrow_3, width/2+220, 300, 30, 70);
    if (owl.tutorial_state(false) && owl2.tutorial_state(false)) {
      iterateGameStateCounter();
    }
  }
    
  if (current_state == GSO.GAME || isTutorialPlayer2() || current_state == GSO.STORY_5) {
    owl.display();
    owl2.display();
    if(current_state != GSO.STORY_5) {
      owl.moveLeftWing();
      owl.moveRightWing();
      owl2.moveLeftWing();
      owl2.moveRightWing();
    }
  }
  if (isTutorial() || current_state == GSO.GAME) {
    for (let i = 0; i< emotion_array.length; i++) {
      if (emotion_array[i].y_position > height) {
        emotion_array.splice(i, 1);
      } else {
        let emotion = emotion_array[i];
        emotion.move();
        emotion.display();
        if (isTutorialPlayer2() == false) {
          boyCollision(emotion, i);
        }
          //owlMoveOrbs(emotion);
      }
    }
  }
  if (isTutorialPlayer1() || current_state == GSO.GAME || current_state == GSO.STORY_2 || current_state == GSO.STORY_3 || current_state == GSO.STORY_4 || current_state == GSO.STORY_5) {
    if (keyIsPressed) {
      if(keyCode == LEFT_ARROW) {
        moveAngle(true);
      } else if(keyCode == RIGHT_ARROW) {
        moveAngle(false);
      }
    }
    displayBoy(hit);
  }
  if (current_state == GSO.STORY_3 || current_state == GSO.STORY_4 || current_state == GSO.STORY_5) {
    image(dark_orb, width/2+70, 600, 60, 60);
    image(dark_orb, width/2-70, 500, 60, 60);
    image(dark_orb, width/2-70, 300, 60, 60);
    image(dark_orb, width/2+70, 200, 60, 60);
    if (current_state != GSO.STORY_3) { 
      image(light_orb, width/2+70, 400, 60, 60);
      image(light_orb, width/2-70, 100, 60, 60);
    }
  }
    
  if (current_state == GSO.GAME || current_state == GSO.TUTORIAL_1_2 || isTutorialPlayer2()) {
    if (frameCount % 90 === 0) {
      var n = 2
      let status_array = [1, 2, 3, 4];
        
      if (current_state == GSO.TUTORIAL_1_2) {
        status_array = [2,3];
      } else if (current_state == GSO.TUTORIAL_2_1) {
        status_array = [1,3];
      } else if (current_state == GSO.TUTORIAL_2_2) {
        status_array = [2,4];
      }
      randomItems = status_array.sort(() => 0.5 - Math.random()).slice(0, n);
      spawnObjects(randomItems[0]);
      if (current_state != GSO.TUTORIAL_1_2) {
        spawnObjects(randomItems[1]);
      }
    }
  }
  
  if (current_state == GSO.EMOTION_GENERATION) {
    // light_input.show();
    // dark_input.show();
    updateEmotionValue();
  } else {
    // light_input.hide();
    // dark_input.hide();
  } 
  if (current_state == GSO.ENDING_1) {
    let final_vid_img = final_vid.get();
    image(final_vid_img, width/2, height/2);  
  } 
  if (current_state == GSO.RESOURCE_LIST) {
    image(resources, width/2, height/2, width, 677)
  }
   
  displayText();
}

function preload() {
  //Main Assets
  background_img_scroll = loadImage('assets/clouds.jpg');
  boy = loadImage('assets/da_boy.png');
  rope = loadImage('assets/rope.png');
  background_img_scroll_dark = loadImage('assets/dark_clouds_long.jpg');
  play_button = loadImage('assets/Playbutton.png');
  resources = loadImage('assets/Resources.jpg');
  
  light_orb = loadImage('assets/light_orb_final.png')
  dark_orb = loadImage('assets/black_orb_final.png')
  
  //Load Arrows
  arrow_1 = loadImage('assets/arrow_1.png');
  arrow_2 = loadImage('assets/arrow_2.png');
  arrow_3 = loadImage('assets/arrow_3.png');
  arrow_4 = loadImage('assets/arrow_4.png');
  
  //Tutorial Images
  intro_screen = loadImage('assets/tutorial/intro_screen.png');
  tutorial_1_1 = loadImage('assets/tutorial/tutorial_1_1.png');
  tutorial_1_2 = loadImage('assets/tutorial/tutorial_1_2.png');
  tutorial_1_3 = loadImage('assets/tutorial/tutorial_1_3.png');
  tutorial_1_4 = loadImage('assets/tutorial/tutorial_1_4.png');
  tutorial_2_1 = loadImage('assets/tutorial/tutorial_2_1.png');
  tutorial_2_2 = loadImage('assets/tutorial/tutorial_2_2.png');
  tutorial_2_3 = loadImage('assets/tutorial/tutorial_2_3.png');
  tutorial_2_4 = loadImage('assets/tutorial/tutorial_2_4.png');
  ready_screen = loadImage('assets/tutorial/ready.png');
  arrow_tutorial = loadImage('assets/tutorial/arrow.png');
  
  //Audio Assets
  soundFormats("mp3");
  bgm = loadSound('assets/in-deep-distress-112438');
  swoosh = loadSound('assets/audio/swoosh');
  posHitSound = loadSound('assets/audio/positive_orb');
  negHitSound = loadSound('assets/audio/negative_orb');
  cell_phone_track = loadSound('assets/audio/cell_phone_track');
  
  // VO Comments
  vo_game_state_1 = loadSound('assets/audio/introduction_cell');
  vo_game_state_2 = loadSound('assets/audio/Part_1');
  vo_game_state_3 = loadSound('assets/audio/part_2');
  vo_game_state_4 = loadSound('assets/audio/part_3');
  vo_game_state_6 = loadSound('assets/audio/part_4');
  vo_game_state_7 = loadSound('assets/audio/ending');
  
  //Font Loading
  player_1_font = loadFont('assets/fonts/Action Man.ttf');
  player_2_font = loadFont('assets/fonts/KOMIKAX_.ttf');
}

//wipe content and add orbs
function iterateGameStateCounter() {
  clear();
  game_state_counter += 1;
  emotion_array = [];
}

//function to iterate tutorial stages
function moveGameState() {
  let current_time = millis()
  if (isEndNarrative() || isInitialNarrative()) {
    if (text_array.length == 0) {
      iterateGameStateCounter();
      writeText();
    }
  } else if (game_states_array[game_state_counter] == GSO.GAME) {
    if (opacity_value<0) {  
        //win screen when image comes fully into screen
        opacity_value = 0;
        iterateGameStateCounter();
        writeText();
      } 
  }
}

function isTutorialScreensPlayer1() {
  return (game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_1 || game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_2 || game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_3 || game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_4);
}

function isTutorialScreensPlayer2() {
  return (game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_1 || game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_2 || game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_3 || game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_4);
}

function isPopupScreen() {
  return (isTutorialScreensPlayer1() || isTutorialScreensPlayer2() || game_states_array[game_state_counter] == GSO.BEFORE_PLAYING || game_states_array[game_state_counter] == GSO.EMOTION_GENERATION);
}

function isTutorial() {
  return (isTutorialPlayer1() || isTutorialPlayer2());
  // return (game_states_array[game_state_counter] == GSO.STORY_2 || game_states_array[game_state_counter] == GSO.STORY_3 || game_states_array[game_state_counter] == GSO.STORY_4);
}

function isTutorialPlayer1() {
  return (game_states_array[game_state_counter] == GSO.TUTORIAL_1_1_L || game_states_array[game_state_counter] == GSO.TUTORIAL_1_1_R || game_states_array[game_state_counter] == GSO.TUTORIAL_1_2);
}

function isTutorialPlayer2() {
  return (game_states_array[game_state_counter] == GSO.TUTORIAL_2_1 || game_states_array[game_state_counter] == GSO.TUTORIAL_2_2);
}

function isInitialNarrative() {
  return (game_states_array[game_state_counter] == GSO.STORY_1 || game_states_array[game_state_counter] == GSO.STORY_2 || game_states_array[game_state_counter] == GSO.STORY_3 || game_states_array[game_state_counter] == GSO.STORY_4 || game_states_array[game_state_counter] == GSO.STORY_5);
  // return (game_states_array[game_state_counter] == GSO.STORY_1);
}

function isEndNarrative() {
  return (game_states_array[game_state_counter] == GSO.ENDING_1 || game_states_array[game_state_counter] == GSO.ENDING_2);
}

//show tutorial screens 
function showTutorialScreens() {
   if (isPopupScreen()) {
     image(arrow_tutorial, width-100, height-100, 120, 80);
  }
  if (game_states_array[game_state_counter] == GSO.BEFORE_PLAYING) {
    image(intro_screen, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_1) {
    image(tutorial_1_1, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_2) {
    image(tutorial_1_2, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_3) {
    image(tutorial_1_3, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_1_IMG_4) {
    image(tutorial_1_4, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_1) {
    image(tutorial_2_1, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_2) {
    image(tutorial_2_2, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_3) {
    image(tutorial_2_3, width/2, height/2, 840, 480);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_2_IMG_4) {
    image(tutorial_2_4, width/2, height/2, 840, 480);
    owl.setGlowColor(true, 100);
    owl2.setGlowColor(true, 100);
  } else if (game_states_array[game_state_counter] == GSO.READY) {
    image(ready_screen, width/2, height/2, 840, 480);
    image(play_button, width/2, height/2+150, 150, 150);
  }
}

//scroll background functionality
function moveBackground() {
  let scrollSpeed = 0.5;
  push();
  imageMode(CORNER);
  push();
  //scale(-1, 1);
  image(background_img_scroll, 0, background_position_1, width, width*4);
  pop();
  image(background_img_scroll, 0, background_position_2, width, width*4);
  
  push();
  //scale(-1, 1);
  tint(255, 255, 255, opacity_value);
  image(background_img_scroll_dark, 0, background_position_1, width, width*4);
  pop();
  tint(255, 255, 255, opacity_value);
  image(background_img_scroll_dark, 0, background_position_2, width, width*4);
  
  
  background_position_1 += scrollSpeed;
  background_position_2 += scrollSpeed;
  if (background_position_1 > width*4) {
    background_position_1 = -width*4 ;
  } 
  if (background_position_2 > width*4) {
    background_position_2 = -width*4;
  }
  
  
  pop();
}

//Check if the boy collides with an orb
function boyCollision(emotion, index) {
  //Get the boys current position
  let boy_position = getBoyPosition();
  //Check if the boy colides with any of the orbs
  if (dist(boy_position.x, boy_position.y, emotion.get_x_position(), emotion.get_y_position()) < 100) {
    
    //If the orb is a positive emotion
    if (emotion.get_good_value() == true) {
     
      //Increase hit marker for positive and decrease opacity of background
      if (joy_filled_value.isLoaded()) {
        joy_filled_value.play();
        //joy_filled_value.setVolume(1);
      } else {
        posHitSound.play();
      posHitSound.setVolume(1);
      }
      last_hit_negative = false;
      last_hit_time = millis();
      // if (joy_string != '') {
      //   add_array_object(4, joy_string, last_hit_time, 200);
      // }
      if (game_states_array[game_state_counter] == GSO.GAME || game_states_array[game_state_counter] == GSO.TUTORIAL_1_2) {
      good_object_hit += 1;
      opacity_value -= 10;
      }
    } 
    //If the orb is a negative emtion
    else {
      // add hit marker
      if (fear_filled_value.isLoaded()) {
        fear_filled_value.play();
        //fear_filled_value.setVolume(1);
      } else {
        negHitSound.play();
        negHitSound.setVolume(1);
      }
      last_hit_negative = true;
      last_hit_time = millis();
      // if (fear_string != '') {
      //   add_array_object(4, fear_string, last_hit_time, 200);
      // }
      if (game_states_array[game_state_counter] == GSO.GAME || game_states_array[game_state_counter] == GSO.TUTORIAL_1_2) {
        opacity_value += 10;
        bad_object_hit += 1;
        if (opacity_value > 255) {
          opacity_value = 255;
        }
      }
    }
    emotion_array.splice(index, 1);
  }
}

//function to allow for adding negative and positive emotions
function updateEmotionValue() {
  push();
  let header = "What brings you joy? What brings you fear?";
  textSize(40);
  textFont(player_1_font);
  fill(255);
  text(header, width/2 - textWidth(header)/2, 100);
  text("joy", width/2 - 250-textWidth("joy"), 300);
  text("fear", width/2 + 200, 300);
  let bottom_string = "click once to begin recording and again to end recording"
  text(bottom_string, width/2-textWidth(bottom_string)/2, 550);
  pop();
  push();
  fill(255);
  let subheader = "audio Record your answers or type it out";
  textSize(30);
  textFont(player_1_font);
  text(subheader, width/2-textWidth(subheader)/2, 150);
  pop();
  push();
  //need to finish tint code
  if (joy_filled_value.isLoaded() == false) {
    tint(0, 0, 0, 150)
  }
  if (joy_recording == true) {
    tint(255, 255, 255, 150)
  }
  image(light_orb, width/2-250, 400, 180, 180);
  pop();
  push();
  if (fear_filled_value.isLoaded() == false) {
    tint(0, 0, 0, 150)
  }
  if (fear_recording == true) {
    tint(255, 255, 255, 150)
  }
  image(dark_orb, width/2+250, 420, 180, 180);
  pop();
  // dark_input.position(width/2+170, 520);
  // light_input.position(width/2-310, 520);
  // joy_string = light_input.value();
  // fear_string = dark_input.value();
}

//Functionality to detect movemement from the owls and switch orb locations
function keyPressed() {
  if (game_states_array[game_state_counter] == GSO.GAME || isTutorialPlayer2()) {
   wingFlapped();
 } if (game_states_array[game_state_counter] == GSO.GAME || isTutorialPlayer1()) {
    if (keyCode >= 48 && keyCode <= 57) {
      rotation_val = keyCode - 57;
      rotation_angle = rotation_val * 5;
    }
    if (keyCode >= 73 && keyCode <= 81) {
      rotation_val = keyCode - 72;
      rotation_angle = rotation_val * 5;
    }
  }
}

//move wing beats and check if any orbs are nearby
function wingFlapped() {
  for (let i = 0; i< emotion_array.length; i++) {
     emotion = emotion_array[i];
    //Player 2 code
    if (keyCode == 70) {
      owl.startLeftWingBeat();
      if (dist(owl.get_x_position(), owl.get_y_position(), emotion.get_x_position(), emotion.get_y_position()) < 80) {
        emotion.set_horizontal_move(width/2-70);
        updateWingTutorial(owl, true);
      }
    } else if (keyCode == 72) {
      owl.startRightWingBeat();
      if (dist(owl.get_x_position(), owl.get_y_position(), emotion.get_x_position(), emotion.get_y_position()) < 80) {
        emotion.set_horizontal_move(width/2-210);
        updateWingTutorial(owl, false);
      }
    } 
    //Player 3 code
    else if (keyCode == 65) {
      owl2.startLeftWingBeat();
      if (dist(owl2.get_x_position(), owl2.get_y_position(), emotion.get_x_position(), emotion.get_y_position()) < 80) {
        emotion.set_horizontal_move(width/2+210);
        updateWingTutorial(owl2, true);
      }
    } else if (keyCode == 68) {
      owl2.startRightWingBeat();
      if (dist(owl2.get_x_position(), owl2.get_y_position(), emotion.get_x_position(), emotion.get_y_position()) < 80) {
          emotion.set_horizontal_move(width/2+70);
          updateWingTutorial(owl2, false);
      }
    }
  }
}

function updateWingTutorial(owl_flap, left) {
  if (game_states_array[game_state_counter] == GSO.TUTORIAL_2_1 && left) {
    owl_flap.setGlowColor(left, owl_flap.getGlowColor(left)-50);
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_2_2 && left==false) {
    owl_flap.setGlowColor(left, owl_flap.getGlowColor(left)-50);
  }
}
 

//Mouse click functionality for moving through states
function mousePressed() {
  if (isTutorialScreensPlayer1() || isTutorialScreensPlayer2()) {
      if ((mouseX > width-160 && mouseX < width-40) && (mouseY > height-140 && mouseY < height-60)) {
      iterateGameStateCounter();
    }
  } else if (game_states_array[game_state_counter] == GSO.BEFORE_PLAYING) {
    if ((mouseX > width-160 && mouseX < width-40) && (mouseY > height-140 && mouseY < height-60)) {
      game_state_counter = 1;
      writeText();
    }
  } else if (game_states_array[game_state_counter] == GSO.EMOTION_GENERATION) {
    if ((mouseX > width-160 && mouseX < width-40) && (mouseY > height-140 && mouseY < height-60)) {
      if (joy_recording == false && fear_recording == false) {
        iterateGameStateCounter();
      }
    } 
    if ((mouseX > width/2-340 && mouseX < width/2-160) && (mouseY < 490 && mouseY > 310)) {
      setEmotionAudio(true);
    } else if ((mouseX < width/2+340 && mouseX > width/2+160) && (mouseY < 490 && mouseY > 310)) {
      setEmotionAudio(false);
    }
  } else if (game_states_array[game_state_counter] == GSO.READY) {
    if ((mouseX < width/2 + 75 && mouseX > width/2-75) && (mouseY > height/2+75 && mouseY < height/2 + 225)) {
      iterateGameStateCounter();
    }
  } else if (game_states_array[game_state_counter] == GSO.TUTORIAL_1_2) {
    opacity_value = 255;
    iterateGameStateCounter();
  }
}

//set audio for emotion input
function setEmotionAudio(joy = false) {
  if (mic.enabled) {
    if (joy_recording == false && fear_recording == false) {
      if (joy == true) {
        recorder.record(joy_filled_value);
        joy_recording = true;
      } else {
        recorder.record(fear_filled_value);
        fear_recording = true;
      }
    } else {
      recorder.stop();
      joy_recording = false;
      fear_recording = false;
    }
  }
}

//Change angle of character
function rotateCharacter(targetAngle) {
    let easing = 0.1;
    let diff = targetAngle - rotation_angle;
    if (abs(diff) > 1) {
      rotation_angle += diff * easing;
    } else {
        rotation_angle = targetAngle;
    }
}

// rotation angle for character (may remove)
function moveAngle(left) {
  if (left) {
    rotation_angle -= 1;
    if (rotation_angle<-45) {
      rotation_angle = -45;
    }
  } else {
    rotation_angle += 1;
    if (rotation_angle>45) {
      rotation_angle = 45;
    }
  } 
}

//Display character
function displayBoy(hit) {
  push();
  translate(width/2, height);
  rotate(rotation_angle);
  
  //if character has been hit
  if (millis()-last_hit_time<200) {
    if (last_hit_negative) {
      tint('red');
    } else {
      tint('gold');
    }
  }
  image(boy, 0, -100, 200, 200);
  pop();
  // if (millis()-last_hit_time<200) {
  //   push();
  //   textSize(30);
  //   textStyle(BOLD);
  //   if (last_hit_negative) {
  //     //fill(255, 0, 0);
  //     text(fear_string, width/2-textWidth(fear_string)/2, height-180);
  //   } else {
  //     //fill(255, 215, 0);
  //     text(joy_string,width/2-textWidth(joy_string)/2, height-180);
  //   }
  //   pop();
  // }
}

//Spawn new monster
function spawnObjects(input_num) {
  let evil_or_good_val = random();
  let make_them_good = false;
  if (evil_or_good_val > 0.5) {
    make_them_good = true;
  }
  let movement_speed = (game_states_array[game_state_counter] == GSO.GAME && make_them_good == true) ? 4 : 2;
  if (input_num==1) {
      emotion_array.push(new emotionObject(width/2-210, 0, make_them_good, movement_speed));
    } else if (input_num==2) {
      emotion_array.push(new emotionObject(width/2-70, 0, make_them_good, movement_speed));
    } else if (input_num ==3) {
      emotion_array.push(new emotionObject(width/2+70, 0, make_them_good, movement_speed)); 
    } else {
      emotion_array.push(new emotionObject(width/2+210, 0, make_them_good, movement_speed));
    }
}

// Function that determines all of the writing for the subtitles
function writeText() {
  let current_time = millis();
  if (game_states_array[game_state_counter] == GSO.STORY_1) {
    vo_game_state_1.play();
    vo_game_state_1.setVolume(1.5);
    let message_1_time = add_array_object(1, "Hey, what’s up?", current_time+6500, 1500);
    let message_2_time = add_array_object(2, "Hey, I’m just checking in. How’re you feeling?", message_1_time, 3000);
    
    let message_3_time = add_array_object(1, "Umm... yeah. Stressed, I guess. You?", message_2_time, 6000);
    
    let message_4_time = add_array_object(2, "I’m doing alright. Do you want to talk about how you’ve been feeling? I noticed you’ve been stressed for a while now.", message_3_time, 8000);
    
    let message_5_time = add_array_object(1, "Well, I guess... There's just has been a lot going on.", message_4_time, 5500);  
    let message_6_time = add_array_object(3, "I think this is the best way I can put it.", message_5_time, 6000);
  }
  // if (game_states_array[game_state_counter] == GSO.STORY_1) {   
  //     vo_game_state_1.play();  
  // } 
  else if (game_states_array[game_state_counter] == GSO.STORY_2) { 
    bgm.play(); 
    bgm.setVolume(0.05);
    bgm.loop();
    vo_game_state_2.play();
    
    let message_1_time = add_array_object(1, "For the past couple of months, I’ve been feeling like, I don't know, like I was on a tightrope", current_time, 5500);
    let message_2_time = add_array_object(2, "On a tightrope?", message_1_time, 1000);
    let message_3_time = add_array_object(1, "Yeah just, you know, trying to balance everything in life and at work", message_2_time, 5500);
    let message_4_time = add_array_object(1, "trying to keep moving forward, and I'm just terrified of falling off into this unknown dark abyss.", message_3_time, 6500);
    
    let message_5_time = add_array_object(2, "That sounds stressful, I’m so sorry to hear that", message_4_time, 4000);

  } 
  else if (game_states_array[game_state_counter] == GSO.STORY_3){
    vo_game_state_3.play();
    vo_game_state_3.setVolume(1.5);
    let message_1_time = add_array_object(1, "I was trying really hard to keep my self-doubt and anxiety at bay, but they just kept coming...", current_time, 7500);
  }
  else if (game_states_array[game_state_counter] == GSO.STORY_4) {
    let message_1_time = add_array_object(1, "I am also trying to grab onto little moments of joy", current_time, 5000);
    let message_2_time =  add_array_object(1, "these remind me that the darkness will evenutally pass.", message_1_time, 5000);
  }
  else if (game_states_array[game_state_counter] == GSO.STORY_5) {
    vo_game_state_4.play();
    vo_game_state_4.setVolume(1.5);
    let message_1_time = add_array_object(1, "You - and of course all of our friends - have really been there for me though.", current_time, 6500); 
    let message_2_time = add_array_object(1, "and just.. you're reminding me of these little joyful moments,", message_1_time, 4000); 
    let message_3_time = add_array_object(1, "helping me overcome that self-doubt and that anxiety I am feeling.", message_2_time, 6500); 
  }
  else if (game_states_array[game_state_counter] == GSO.ENDING_1) {
      vo_game_state_6.play();
    let message_1_time = add_array_object(1, "Honestly, i’m holding on to hope that all this will clear up eventually", current_time, 7000);
     let message_2_time = add_array_object(1, "I mean, it’s scary now but, maybe it isn’t that scary to step off the tightrope to take a little break.", message_1_time, 8000);
  }
  else if (game_states_array[game_state_counter] == GSO.ENDING_2) {
    vo_game_state_7.play();
    let message_1_time = add_array_object(1, "So yeah, that’s the best way I can describe it.", current_time, 5500);
    let message_2_time = add_array_object(2, "Wow, thanks so much for sharing that, it must not have been so easy.", message_1_time, 5000);
    let message_3_time = add_array_object(1, "It... actually felt great to talk about that with someone. Thanks for listening to me.", message_2_time, 7000);
    let message_4_time = add_array_object(2, "Yeah - do you want to talk about it more?", message_3_time, 3000);
    let message_5_time = add_array_object(1, "I’m alright for now. But... thank you. It’s seriously so nice to know that I can always reach out to you for support.", message_4_time, 12000);
  }
}

function add_array_object(player_num, string_message, start_time, message_length) {
  text_array.push(new wordBlock(player_num, string_message, start_time, message_length));
  return start_time + message_length;
}

function displayText() {
  for (let i = 0; i<text_array.length; i++) {
    let text_object = text_array[i];
    let current_time = millis();
    if (current_time > text_object.getTime() && current_time < text_object.getEndTime()) {
      text_object.display();
    } else if (current_time > text_object.getEndTime()) {
      text_array.splice(i,1);
    }
  }
}

//Get position of player based off rotation of access
function getBoyPosition() {
    let distanceFromCenterX = 0;
  let distanceFromCenterY = -100;
  let x_rotated_left = distanceFromCenterX * cos(rotation_angle) - distanceFromCenterY* sin(rotation_angle);
  let y_rotated_left = distanceFromCenterX * sin(rotation_angle) + distanceFromCenterY* cos(rotation_angle);
  return {x: x_rotated_left+width/2, y: y_rotated_left+height};
}

//Class for all moving image based objects
class movingObject {
  constructor(x, y, main_image_string) {
    this.x_position = x;
    this.y_position = y;
    this.image_obj = loadImage(main_image_string);
  }
  get_x_position() {
    return this.x_position;
  }
  
  get_y_position() {
    return this.y_position;
  }
}

//Class for emotion abstracted from movingObject
class emotionObject extends movingObject {
  constructor(x, y, good, verticle_speed=0) {
    let glowImage;
    if (good == true) {
      glowImage = 'assets/light_orb_final.png';
    } else {
      glowImage = 'assets/black_orb_final.png';
    }
    super(x,y,glowImage);
    this.good = good;
    this.move_time;
    this.verticle_move_speed = verticle_speed;
    this.target_position_x = x;
    this.wind_icon = loadImage('assets/tornado_power.png');
  }
  
  set_x_position(x) {
    this.x_position = x;
  }
  
  set_horizontal_move(target_x){
    if (target_x != this.x_position) {
      this.move_time = millis();
      this.target_position_x = target_x;
    }
  }
  
  get_good_value() {
    return this.good;
  }
  
  set_in_tutorial(in_tutorial) {
    this.in_tutorial = in_tutorial;
  }
  
  move_x_direction() {
    if ((millis() < this.move_time + 500) && this.x_position != this.target_position_x) {
      if (this.x_position < this.target_position_x) {
        image(this.wind_icon, this.x_position-30, this.y_position, 60, 60);
        this.x_position  += 5;
      } else if (this.x_position > this.target_position_x ) {
        image(this.wind_icon, this.x_position+30, this.y_position, 60, 60);
        this.x_position  -= 5;
      }
    }
  }
  
  move() {
    if (millis() < this.move_time + 500) {
      this.move_x_direction();
    } else {
      if (this.target_position_x != this.x_position) {
          this.x_position = this.target_position_x;
        }
      this.y_position += this.verticle_move_speed;
    }
  }
  
  display() {
    image(this.image_obj, this.x_position, this.y_position, 60, 60);
  }
}

//Class for owls abstracted from movingObject
class player23 extends movingObject {
  constructor(x, y, playerNum) {
    let playerImg;
    if (playerNum == 1) {
      playerImg = 'assets/yellow_owl.png';
    } else {
      playerImg = 'assets/pink_owl.png';
    }
    super(x,y, playerImg);
    this.playerNum = playerNum;
    this.left_wing_angle = 0;
    this.right_wing_angle = 0;
    this.left_wing_beat_time;
    this.left_tint_opacity = 0;
    this.right_tint_opacity = 0;
    this.right_wing_beat_time;
    if (this.playerNum == 1) {
      this.color_values = {"r": 255, g: 255, "b": 0}
      this.player_lw = loadImage('assets/yellow_owl_lw.png');
      this.player_rw = loadImage('assets/yellow_owl_rw.png');
    } else {
      this.color_values = {"r": 255, g: 0, "b": 255}
      this.right_glow_color = color(255, 0, 255, this.right_tint_opacity);
      this.player_lw = loadImage('assets/pink_owl_lw.png');
      this.player_rw = loadImage('assets/pink_owl_rw.png');
    }
  }
  
  //show owl object
  display() {
    push();
    translate(this.x_position, this.y_position);
    //tint(255,255,255, this.left_tint_opacity);
    if (this.left_tint_opacity) {
      let left_glow_color = color(this.color_values.r, this.color_values.g, this.color_values.b, this.left_tint_opacity);
      noStroke();
      fill(left_glow_color);
      circle(-40, 3, 50);
    }
    rotate(this.left_wing_angle);
    image(this.player_lw, -40, 3, 48, 36);
    pop();
    push();
    translate(this.x_position, this.y_position);
    rotate(this.right_wing_angle);
    if (this.right_tint_opacity) {
      let right_glow_color = color(this.color_values.r, this.color_values.g, this.color_values.b, this.right_tint_opacity);
      noStroke();
      fill(right_glow_color);
      circle(40, 3, 50);
    }
    image(this.player_rw, 40, 3, 48, 36);
    pop();
    push();
    image(this.image_obj, this.x_position, this.y_position, 100, 100);
    pop();
  }
  
  //add a glow effect
  setGlowColor(left, color_val) {
    if (color_val < 0) {
      color_val = 0;
    } if (left)  {
      this.left_tint_opacity = color_val;
    } else {
      this.right_tint_opacity = color_val;
    }
  }
  
  //return current glow effect
  getGlowColor(left) {
    return left ? this.left_tint_opacity : this.right_tint_opacity;
  }
  
  tutorial_state(left) {
    if (left) {
      return (this.left_tint_opacity == 0);
    } else {
      return (this.right_tint_opacity == 0);
    }
  } 
  
  startLeftWingBeat() {
    swoosh.play();
    swoosh.setVolume(0.1);
    this.left_wing_beat_time = millis();
  }
  
  moveLeftWing() {
  let current_time = millis();
   if (current_time < this.left_wing_beat_time + 100) {
     this.left_wing_angle += 5;
   } else if (current_time < this.left_wing_beat_time + 200) {
     this.left_wing_angle -= 5;
   } else {
     this.left_wing_angle = 0;
   }
  }
  
  startRightWingBeat() {
    swoosh.play();
    swoosh.setVolume(0.1);
    this.right_wing_beat_time = millis();
  }
  
  moveRightWing() {
   let current_time = millis();
   if (current_time < this.right_wing_beat_time + 100) {
     this.right_wing_angle -= 7;
   } else if (current_time < this.right_wing_beat_time + 200) {
     this.right_wing_angle += 7;
   } else {
     this.right_wing_angle = 0;
   }
  }
}

//Class for V/O subtitles
class wordBlock {
  constructor(character_num, text_string=null, time=null, text_time=null, game_state = null, text_width = null, text_height = null) {
    //Change character number to text position and text font marker
    if (character_num == 1) {
      this.x_position = 50;
      this.y_position = height-400;
      this.text_leading = 30;
      this.max_width = 300;
    }else if (character_num == 2) {
      this.x_position = width-350;
      this.y_position = height-400;
      this.text_leading = 30;
      this.max_width = 300;
    } else if (character_num == 3) {
      this.x_position = width/2;
      this.y_position = height/2;
      this.text_leading = 30;
      this.max_width = 400;
    } else {
      this.x_position = width/2;
      this.y_position = height-250;
      this.text_leading = 0;
      this.max_width = 300;
    }
    this.character_num = character_num;
    this.text_string = text_string;
    this.time = time;
    this.text_time = text_time;
  }
  
  getTime() {
    return this.time;  
  }
  
  getEndTime() {
    if (this.time && this.text_time) {
      return this.time + this.text_time;
    } else {
      return null;
    }
  }
  
  //show text object based off the character num type
  display() {
    push();
    noStroke();
    imageMode(CORNER);
    if (this.character_num == 1) {
      textFont(player_1_font);
      textSize(30);
    } else if (this.character_num == 2) {
      textFont(player_2_font);
      textSize(25);
    } else {
      textFont(player_1_font);
      textSize(30);
      this.text_leading = 30;
      textAlign(CENTER);
    }
    textWrap(WORD);
    textLeading(this.text_leading);
    let text_width = this.textWidthWithMaxWidth(this.text_string, this.max_width);
    let text_height = this.calculateTextBoxHeight(this.text_string, text_width, this.text_leading);
    let x_position = this.character_num == 3 || this.character_num == 4 ? this.x_position - text_width/2 : this.x_position;
    rect(x_position, this.y_position, text_width + 10, text_height + 10);
    fill(0);
    text(this.text_string, x_position+5, this.y_position+this.text_leading, text_width);
    pop();
  }
  
  textWidthWithMaxWidth(text, maxWidth) {
  let currentWidth = textWidth(text);
  if (currentWidth > maxWidth) {
    return maxWidth;
  } else {
    return currentWidth;
  }
}

// Function to calculate the height of the text box based on the width and maximum width
  calculateTextBoxHeight(text, maxWidth, line_size) {
  let words = text.split(' ');
  let currentWidth = 0;
  let textBoxHeight = line_size;

  for (let i = 0; i < words.length; i++) {
    let wordWidth = textWidth(words[i] + ' ');
    
    if (currentWidth + wordWidth <= maxWidth) {
      currentWidth += wordWidth;
    } else {
      currentWidth = wordWidth;
      textBoxHeight += line_size;
    }
  }
  return textBoxHeight;
  }
}