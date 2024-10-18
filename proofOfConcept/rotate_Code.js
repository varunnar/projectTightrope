pause(2000)
forever(function () {
    console.logValue("degree", input.rotation(Rotation.Pitch))
    if (input.rotation(Rotation.Pitch) > 15 && input.rotation(Rotation.Pitch) < 60) {
        light.showRing(
        `red red red red red black black black black black`
        )
        keyboard.functionKey(KeyboardFunctionKey.LeftArrow, KeyboardKeyEvent.Press)
    } else if (input.rotation(Rotation.Pitch) < -15 && input.rotation(Rotation.Pitch) > -60) {
        light.showRing(
        `black black black black black green green green green green`
        )
        keyboard.functionKey(KeyboardFunctionKey.RightArrow, KeyboardKeyEvent.Press)
    } else if (input.rotation(Rotation.Pitch) > -15 && input.rotation(Rotation.Pitch) < 15) {
        keyboard.functionKey(KeyboardFunctionKey.UpArrow, KeyboardKeyEvent.Press)
        light.setAll(0xffff00)
    } else {
        light.setAll(0x0000ff)
        keyboard.functionKey(KeyboardFunctionKey.DownArrow, KeyboardKeyEvent.Press)
    }
})
