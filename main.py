def copyHits():
    for x in range(5):
        arrayHits[x] = []
        for y in range(5):
            arrayHits[x][y] = led.point_brightness(x, y)

def on_button_pressed_a():
    global A
    A += 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def copyShips():
    for x2 in range(5):
        arrayShips[x2] = []
        for y2 in range(5):
            arrayShips[x2][y2] = led.point(x2, y2)
def drawShips():
    for x22 in range(5):
        for y22 in range(5):
            if arrayShips[x22][y22]:
                led.plot(x22, y22)

def on_logo_pressed():
    global A, B
    if not (isPhase2):
        led.toggle(A, B)
        A = 0
        B = 0
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def drawHits():
    for x23 in range(5):
        for y23 in range(5):
            led.plot_brightness(x23, y23, arrayHits[x23][y23])

def on_button_pressed_ab():
    global isPhase2, A, B
    if isPhase2:
        radio.send_value("SHOT", 5 * B + A)
    else:
        radio.send_string("READY")
        copyShips()
        createABArray()
        basic.clear_screen()
        copyHits()
        isPhase2 = True
        A = 0
        B = 0
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def createABArray():
    for x3 in range(5):
        abArray[x3] = []
        for y3 in range(5):
            abArray[x3][y3] = 5 * y3 + x3

def on_received_string(receivedString):
    global isFirstPlayer, A, B
    if receivedString == "READY":
        music.play(music.builtin_playable_sound_effect(soundExpression.hello),
            music.PlaybackMode.UNTIL_DONE)
        if isPhase2:
            isFirstPlayer = True
            radio.send_string("START")
            basic.show_string("START")
            music.play(music.builtin_playable_sound_effect(soundExpression.happy),
                music.PlaybackMode.UNTIL_DONE)
    if receivedString == "START":
        basic.show_string("START")
        drawShips()
        music.play(music.builtin_playable_sound_effect(soundExpression.happy),
            music.PlaybackMode.UNTIL_DONE)
    if receivedString == "HIT":
        music.play(music.builtin_playable_sound_effect(soundExpression.happy),
            music.PlaybackMode.UNTIL_DONE)
        led.plot(A, B)
    if receivedString == "MISSED":
        music.play(music.builtin_playable_sound_effect(soundExpression.sad),
            music.PlaybackMode.UNTIL_DONE)
        led.plot_brightness(A, B, 100)
    if receivedString == "MISSED" or receivedString == "HIT":
        copyHits()
        basic.clear_screen()
        drawShips()
        A = 0
        B = 0
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global B
    B += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global shotX, shotY
    for x4 in range(5):
        for y4 in range(5):
            if abArray[x4][y4] == value:
                shotX = x4
                shotY = y4
    if arrayShips[shotX][shotY]:
        radio.send_string("HIT")
    else:
        radio.send_string("MISSED")
    basic.clear_screen()
    drawHits()
radio.on_received_value(on_received_value)

shotY = 0
shotX = 0
abArray: List[List[number]] = []
B = 0
isPhase2 = False
arrayShips: List[List[bool]] = []
A = 0
arrayHits: List[List[number]] = []
isFirstPlayer = False
radio.set_group(1)
isFirstPlayer = False