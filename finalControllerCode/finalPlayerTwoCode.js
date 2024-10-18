input.onGesture(Gesture.TwoG, function () {
    if (cpx_num == 1) {
        light.setAll(0xFF00FF);
        if (left == true) {
            keyboard.type("A");
            light.setBrightness(255);
        } else {
            keyboard.type("D");
            light.setBrightness(255);
        }
        pause(100);
        light.setAll(0x000000);
    } else {
        light.setAll(0xFFFF00);
        if (left == true) {
            keyboard.type("F");
            light.setBrightness(255);
        } else {
            keyboard.type("H");
            light.setBrightness(255);
        }
        pause(100);
        light.setAll(0x000000);
    }
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    left = false;
    light.setAll(0x00ff00);
    // keyboard.type('A');
    pause(500);
    light.setAll(0x000000);
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    left = true;
    light.setAll(0xff0000);
    // keyboard.type('A');
    pause(500);
    light.setAll(0x000000);
})
let left = false;
let cpx_num = 0;
cpx_num = 2;
left = true;