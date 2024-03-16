def on_button_pressed_a():
    global A
    A += 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def copyShips():
    for x in range(5):
        for y in range(5):
            pass

def on_logo_pressed():
    global B, A
    led.toggle(A, B)
    B = 0
    A = 0
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def on_button_pressed_ab():
    global A, B, isPhase2
    radio.send_string("ooo")
    A = 0
    B = 0
    isPhase2 = True
    copyShips()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global isFirstPlayer
    if receivedString == "READY":
        isFirstPlayer = False
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global B
    B += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

isPhase2 = False
B = 0
A = 0
isFirstPlayer = False
radio.set_group(1)
isFirstPlayer = True