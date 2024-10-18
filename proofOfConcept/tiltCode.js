let tiltState = 0
pause(500)
forever(function () {
    console.log(input.acceleration(Dimension.X))
    if (input.acceleration(Dimension.X) > 500) {
        light.setAll(0x00FFFF)
        keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
        tiltState = -2
    } else if (input.acceleration(Dimension.X) > 250 && input.acceleration(Dimension.X) < 500) {
        light.setAll(0xff0000)
        if (tiltState == -2) {
            keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
        } else if (tiltState > -1) {
            keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
        }
        tiltState = -1
    } else if (input.acceleration(Dimension.X) < -250 && input.acceleration(Dimension.X) > -500) {
        light.setAll(0xffff00)
        if (tiltState == 2) {
            keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
        } else if (tiltState < 1) {
            keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
        }
        tiltState = 1
    } else if (input.acceleration(Dimension.X) < -500) {
        light.setAll(0xff00ff)
        keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
        tiltState = 2
    } else {
        light.setAll(0xff0000)
        if (tiltState == 1) {
            keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
        } else if (tiltState == -1) {
            keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
        } else if (tiltState == 2) {
            keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
            keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
        } else if (tiltState == -2) {
            keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
            keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
        } else {
            console.log("paused")
        }
        tiltState = 0
    }
})
