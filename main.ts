function copyHits () {
    for (let x = 0; x <= 4; x++) {
        arrayHits[x] = []
        for (let y = 0; y <= 4; y++) {
            arrayHits[x][y] = led.pointBrightness(x, y)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    A += 1
})
function copyShips () {
    for (let x = 0; x <= 4; x++) {
        arrayShips[x] = []
        for (let y = 0; y <= 4; y++) {
            arrayShips[x][y] = led.point(x, y)
        }
    }
}
function drawShips () {
    for (let x2 = 0; x2 <= 4; x2++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            if (arrayShips[x2][y2]) {
                led.plot(x2, y2)
            }
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (!(isPhase2)) {
        led.toggle(A, B)
        A = 0
        B = 0
    }
})
function drawHits () {
    for (let x2 = 0; x2 <= 4; x2++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            led.plotBrightness(x2, y2, arrayHits[x2][y2])
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    if (isPhase2) {
        radio.sendValue("SHOT", 5 * B + A)
    } else {
        radio.sendString("READY")
        copyShips()
        createABArray()
        basic.clearScreen()
        copyHits()
        isPhase2 = true
        A = 0
        B = 0
    }
})
function createABArray () {
    for (let x3 = 0; x3 <= 4; x3++) {
        abArray[x3] = []
        for (let y3 = 0; y3 <= 4; y3++) {
            abArray[x3][y3] = 5 * y3 + x3
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
    if (receivedString == "HIT") {
        music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)
        led.plot(A, B)
    }
    if (receivedString == "MISSED") {
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)
        led.plotBrightness(A, B, 100)
    }
    if (receivedString == "MISSED" || receivedString == "HIT") {
        copyHits()
        basic.clearScreen()
        drawShips()
        A = 0
        B = 0
    }
})
input.onButtonPressed(Button.B, function () {
    B += 1
})
radio.onReceivedValue(function (name, value) {
    for (let x4 = 0; x4 <= 4; x4++) {
        for (let y4 = 0; y4 <= 4; y4++) {
            if (abArray[x4][y4] == value) {
                shotX = x4
                shotY = y4
            }
        }
    }
    if (arrayShips[shotX][shotY]) {
        radio.sendString("HIT")
    } else {
        radio.sendString("MISSED")
    }
    basic.clearScreen()
    drawHits()
})
let shotY = 0
let shotX = 0
let abArray: number[][] = []
let B = 0
let isPhase2 = false
let arrayShips: boolean[][] = []
let A = 0
let arrayHits: number[][] = []
let isFirstPlayer = false
radio.setGroup(1)
isFirstPlayer = false
