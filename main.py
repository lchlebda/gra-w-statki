def on_button_pressed_a():
    global A
    A += 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def copyShips():
    for x in range(5):
        array[x] = []
        for y in range(5):
            array[x][y] = led.point(x, y)
def drawShips():
    for x2 in range(5):
        for y2 in range(5):
            if array[x2][y2]:
                led.plot(x2, y2)

def on_logo_pressed():
    led.toggle(A, B)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def on_button_pressed_ab():
    global isPhase2, A, B
    if isPhase2:
        radio.send_value("SHOT", 5 * B + A)
    radio.send_string("READY")
    copyShips()
    createABArray()
    basic.clear_screen()
    isPhase2 = True
    A = 0
    B = 0
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def createABArray():
    for y3 in range(5):
        abArray[y3] = []
        for x3 in range(5):
            abArray[y3][x3] = 5 * y3 + x3

def on_received_string(receivedString):
    global isFirstPlayer
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
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global B
    B += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global shotX, shotY
    basic.clear_screen()
    for x4 in range(5):
        for y4 in range(5):
            if abArray[x4][y4] == value:
                shotX = x4
                shotY = y4
    led.plot(shotX, shotY)
radio.on_received_value(on_received_value)

shotY = 0
shotX = 0
abArray: List[List[number]] = []
isPhase2 = False
B = 0
array: List[List[bool]] = []
A = 0
isFirstPlayer = False
lista: List[number] = []
radio.set_group(1)
isFirstPlayer = False