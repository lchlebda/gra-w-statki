input.onButtonPressed(Button.A, function () {
    A += 1
})
function copyShips () {
    for (let x = 0; x <= 4; x++) {
        array[x] = []
        for (let y = 0; y <= 4; y++) {
            array[x][y] = led.point(x, y)
        }
    }
}
function drawShips () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (array[x][y]) {
                led.plot(x, y)
            }
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.toggle(A, B)
})
input.onButtonPressed(Button.AB, function () {
    if (isPhase2) {
        radio.sendValue("SHOT", 5 * B + A)
    }
    radio.sendString("READY")
    copyShips()
    createABArray()
    basic.clearScreen()
    isPhase2 = true
    A = 0
    B = 0
})
function createABArray () {
    for (let x = 0; x <= 4; x++) {
        abArray[x] = []
        for (let y = 0; y <= 4; y++) {
            abArray[x][y] = 5 * y + x
        }
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "READY") {
        music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone)
        if (isPhase2) {
            isFirstPlayer = true
            radio.sendString("START")
            basic.showString("START")
            music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)
        }
    }
    if (receivedString == "START") {
        basic.showString("START")
        drawShips()
        music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)
    }
})
input.onButtonPressed(Button.B, function () {
    B += 1
})
radio.onReceivedValue(function (name, value) {
    basic.clearScreen()
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (abArray[x][y] == value) {
                shotX = x
                shotY = y
            }
        }
    }
    led.plot(shotX, shotY)
})
let shotY = 0
let shotX = 0
let abArray: number[][] = []
let isPhase2 = false
let B = 0
let array: boolean[][] = []
let A = 0
let isFirstPlayer = false
let lista: number[] = []
radio.setGroup(1)
isFirstPlayer = false
