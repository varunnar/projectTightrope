let run_code = false;
let x_value = 0;
let letter_vals = ["i", "j", "k", "l", "m", "n", "o", "p", "q"];
input.buttonA.onEvent(ButtonEvent.Click, function () {
    light.setAll(0x000000)
    run_code = !(run_code)
    pause(1000)
})
input.onSwitchMoved(SwitchDirection.Left, function () {
    run_code = true
})
forever(function () {
    pause(100)
    if (run_code == true) {
        x_value = Math.map(input.acceleration(Dimension.X), -700, 700, -45, 45)
        let state = Math.round(x_value / 5);
        if (state > 9) {
            state = 9;
        } else if (state < - 9) {
            state = -9;
        }
        let output_state = state + 9;
        if (output_state > 9) {
            light.setAll(0X00FF00);
            keyboard.type(letter_vals[output_state - 10]);
        } else {
            light.setAll(0X0000FF);
            keyboard.type(output_state.toString());
        }
    }
})
