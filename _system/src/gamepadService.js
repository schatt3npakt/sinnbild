import router from "./router";

let gamePadPollingLoop = null;
const buttonPressed = (button) => {
  if (typeof button === "object") {
    return button.pressed;
  }
  return button === 1.0;
}

const gamePadCache = {
}

const gameLoop = () => {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }

  const firstGamePad = gamepads[0];
  const gamePadButtons = {
    a: firstGamePad.buttons[0],
    b: firstGamePad.buttons[1],
    x: firstGamePad.buttons[2],
    y: firstGamePad.buttons[3],
    select: firstGamePad.buttons[8],
    start: firstGamePad.buttons[9],
    dPadUp: firstGamePad.buttons[12],
    dPadDown: firstGamePad.buttons[13],
    dPadLeft: firstGamePad.buttons[14],
    dPadRight: firstGamePad.buttons[15]
  }

  const focusableElements = Array.from(document.querySelectorAll(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  ))

  // Focus first element after header if no element is focused yet
  if (focusableElements.length > 2 ) {
    if (document.activeElement === document.body && document.body.classList.contains("input-type--gamepad")) {
      focusableElements[2].focus()
    }
  }

  for (const button in gamePadButtons) {
    if (buttonPressed(gamePadButtons[button])) {
      if (gamePadCache[button] === false) {
        gamePadCache[button] = true
        document.body.classList.add("input-type--gamepad")
        document.body.classList.remove("input-type--keyboard-mouse")

        const currentFocusedElementIndex = focusableElements.indexOf(document.activeElement)

        switch (button) {
          case "a":
            focusableElements[currentFocusedElementIndex]?.click()
            break;

          case "select":
            router.push("/")
            break;

          case "start":
            router.push("/options")
            break;
  

          case "b":
            router.back()
            break;

          case "dPadDown":
          case "dPadRight":
            // Skip over skiplink at index 0, and if last focusable element is reached, focus first element again
            focusableElements[(currentFocusedElementIndex !== (focusableElements.length - 1)) ? currentFocusedElementIndex + 1 : 0].focus()            
            break;

          case "dPadLeft":
          case "dPadUp":
            // Skip over skiplink at index 0, and if first focusable element is reached, focus last element again
            focusableElements[currentFocusedElementIndex > 0 ? currentFocusedElementIndex - 1 : focusableElements.length - 1].focus()            
            break;
        }
      }
    } else {
      gamePadCache[button] = false
    }
  }

  gamePadPollingLoop = requestAnimationFrame(gameLoop);
}

window.addEventListener("mousemove", () => {
  document.body.classList.remove("input-type--gamepad")
  document.body.classList.add("input-type--keyboard-mouse")
})

window.addEventListener("gamepadconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);

  gameLoop();
});

window.addEventListener("gamepaddisconnected", (e) => {
  console.log("Gamepad disconnected:", e.gamepad);

  cancelAnimationFrame(gamePadPollingLoop);
})