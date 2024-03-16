input.onButtonPressed(Button.A, function () {
    A += 1
})
function copyShips () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
        	
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.toggle(A, B)
    B = 0
    A = 0
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("ooo")
    A = 0
    B = 0
    isPhase2 = true
    copyShips()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "READY") {
        isFirstPlayer = false
    }
})
input.onButtonPressed(Button.B, function () {
    B += 1
})
let isPhase2 = false
let B = 0
let A = 0
let isFirstPlayer = false
radio.setGroup(1)
isFirstPlayer = true
