<template>
  <div>
    <HeaderNavigation />

    <main id="mainContent">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <ul class="gamepad-controls" v-show="isGamepad">
      <li>Bestätigen <svg width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-10,-309)">
        <g id="a">
            <path d="M37.3,313.65C40.433,316.783 42,320.567 42,325C42,329.433 40.433,333.2 37.3,336.3C34.2,339.433 30.433,341 26,341C21.567,341 17.783,339.433 14.65,336.3C11.55,333.2 10,329.433 10,325C10,320.567 11.55,316.783 14.65,313.65C17.783,310.55 21.567,309 26,309C30.433,309 34.2,310.55 37.3,313.65ZM27.35,318L24.6,318L19,331L22.05,331L23.25,328.2L28.7,328.2L29.9,331L33,331L27.35,318Z"/>
            <path d="M24.35,325.7L26,321.85L27.6,325.7L24.35,325.7Z"/>
        </g>
    </g>
</svg>
</li>
      <li>Zurück <svg width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-60,-309)">
        <g id="b">
            <path d="M76,309C80.433,309 84.2,310.55 87.3,313.65C90.433,316.783 92,320.567 92,325C92,329.433 90.433,333.2 87.3,336.3C84.2,339.433 80.433,341 76,341C71.567,341 67.783,339.433 64.65,336.3C61.55,333.2 60,329.433 60,325C60,320.567 61.55,316.783 64.65,313.65C67.783,310.55 71.567,309 76,309ZM76.85,319L72,319L72,332L77.5,332C79.2,332 80.4,331.6 81.1,330.8C81.7,330.1 82,329.3 82,328.4C82,327.567 81.767,326.883 81.3,326.35C80.833,325.783 80.217,325.417 79.45,325.25L79.9,325.05L80.35,324.7C80.983,324.233 81.3,323.483 81.3,322.45C81.3,321.617 81.017,320.867 80.45,320.2L79.1,319.35L76.85,319Z"/>
            <path d="M76.45,326.6L78.45,326.85C78.917,327.017 79.15,327.417 79.15,328.05C79.15,328.617 78.933,329.017 78.5,329.25L76.7,329.55L74.8,329.55L74.8,326.6L76.45,326.6Z"/>
            <path d="M74.8,321.5L76.1,321.5L77.9,321.75C78.233,321.95 78.4,322.333 78.4,322.9C78.4,323.467 78.217,323.85 77.85,324.05L76.1,324.3L74.8,324.3L74.8,321.5Z"/>
        </g>
    </g>
</svg></li>
      <li>Auswählen <svg width="100%" height="100%" viewBox="0 0 27 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-412,-9)">
        <g id="arrows">
            <path d="M437.75,21.4L438.05,22.1L437.75,22.8L437.05,23.1L413.05,23.1L412.35,22.8C412.15,22.6 412.05,22.367 412.05,22.1C412.05,21.833 412.15,21.6 412.35,21.4L424.35,9.4C424.55,9.2 424.783,9.1 425.05,9.1C425.317,9.1 425.55,9.2 425.75,9.4L437.75,21.4Z"/>
            <path d="M412.05,26.1C412.05,25.833 412.15,25.6 412.35,25.4C412.55,25.2 412.783,25.1 413.05,25.1L437.05,25.1C437.317,25.1 437.55,25.2 437.75,25.4L438.05,26.1L437.75,26.8L425.75,38.8L425.05,39.1L424.35,38.8L412.35,26.8C412.15,26.6 412.05,26.367 412.05,26.1Z"/>
        </g>
    </g>
</svg>
</li>
    </ul>
  </div>
</template>

<script>
  import HeaderNavigation from "./components/HeaderNavigation.vue";
  import router from "./router";
  import { loadStateFromStorage } from "./store/persistenceService";

  export default {
    data() {
      return {
        storyConfig: require("../../story/config.json"),
        text: require("./lang/app.json"),
        language: loadStateFromStorage().language,
        isGamepad: false,
      };
    },
    components: {
      HeaderNavigation,
    },
    methods: {
      focusSkipLinkTarget() {
        document.getElementById("mainContent").focus();
      },
    },
    mounted() {
      const storageState = loadStateFromStorage();
      const themeClass = storageState.options.currentTheme;
      document.body.classList.add(themeClass);

      window.setInterval(() => {
        this.language = loadStateFromStorage().language;
      }, 100);

      // Set metadata
      document.querySelector("title").innerHTML =
        this.storyConfig.title[this.language];
      document.querySelector("meta[name='description']").content =
        this.storyConfig.description[this.language];

      let gamePadPollingLoop = null;
      const buttonPressed = (button) => {
        if (typeof button === "object") {
          return button.pressed;
        }
        return button === 1.0;
      };

      const gamePadCache = {};

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
          dPadRight: firstGamePad.buttons[15],
        };

        const focusableElements = Array.from(
          document.querySelectorAll(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
          )
        );

        // Focus first element after header if no element is focused yet
        if (focusableElements.length > 2) {
          if (
            document.activeElement === document.body &&
            document.body.classList.contains("input-type--gamepad")
          ) {
            focusableElements[2].focus();
          }
        }

        for (const button in gamePadButtons) {
          if (buttonPressed(gamePadButtons[button])) {
            if (gamePadCache[button] === false) {
              gamePadCache[button] = true;
              this.isGamepad = true
              document.body.classList.add("input-type--gamepad");
              document.body.classList.remove("input-type--keyboard-mouse");

              const currentFocusedElementIndex = focusableElements.indexOf(
                document.activeElement
              );

              switch (button) {
                case "a":
                  focusableElements[currentFocusedElementIndex]?.click();
                  break;

                case "select":
                  router.push("/");
                  break;

                case "start":
                  router.push("/options");
                  break;

                case "b":
                  router.back();
                  break;

                case "dPadDown":
                case "dPadRight":
                  // Skip over skiplink at index 0, and if last focusable element is reached, focus first element again
                  focusableElements[
                    currentFocusedElementIndex !== focusableElements.length - 1
                      ? currentFocusedElementIndex + 1
                      : 0
                  ].focus();
                  break;

                case "dPadLeft":
                case "dPadUp":
                  // Skip over skiplink at index 0, and if first focusable element is reached, focus last element again
                  focusableElements[
                    currentFocusedElementIndex > 0
                      ? currentFocusedElementIndex - 1
                      : focusableElements.length - 1
                  ].focus();
                  break;
              }
            }
          } else {
            gamePadCache[button] = false;
          }
        }

        gamePadPollingLoop = requestAnimationFrame(gameLoop);
      };

      window.addEventListener("mousemove", () => {
        this.isGamepad = false
      });

      window.addEventListener("keydown", () => {
        this.isGamepad = false
      });

      window.addEventListener("gamepadconnected", (e) => {
        const gp = navigator.getGamepads()[e.gamepad.index];
        console.log(
          "Gamepad connected at index %d: %s. %d buttons, %d axes.",
          gp.index,
          gp.id,
          gp.buttons.length,
          gp.axes.length
        );

        gameLoop();
      });

      window.addEventListener("gamepaddisconnected", (e) => {
        this.isGamepad = false
        console.log("Gamepad disconnected:", e.gamepad);

        cancelAnimationFrame(gamePadPollingLoop);
      });
    },
  };
</script>

<style>
  @import url("../../story/theme.css");

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *:focus {
    outline: var(--primary-color-dark) solid 2px;
    outline-offset: 5px;
  }

  @media (prefers-color-scheme: dark) {
    *:focus {
      outline: var(--primary-color-light) solid 2px;
    }
  }

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important; /* 2 */
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important; /* 3 */
  }

  ul li {
    list-style-type: none;
  }

  body {
    background: var(--primary-color-light);
  }

  main {
    padding: 15px 15px 64px 15px;
    max-width: 900px;
    margin: auto;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background: var(--primary-color-dark);
    }
  }

  * {
    font-family: var(--main-font-family), serif;
    color: var(--primary-color-dark);
    hyphens: auto;
  }

  ::selection {
    background: var(--primary-color-dark);
    color: var(--primary-color-light);
  }

  @media (prefers-color-scheme: dark) {
    * {
      color: var(--primary-color-light);
    }

    ::selection {
      background: var(--primary-color-light);
      color: var(--primary-color-dark);
    }
  }

  button {
    cursor: pointer;
  }

  h1,
  h2 {
    font-family: var(--headline-font-family), sans-serif;
  }

  h1 {
    font-size: var(--h1-font-size);
  }

  h2 {
    font-size: var(--h2-font-size);
  }

  p {
    font-size: var(--main-font-size);
    margin-bottom: 16px;
  }

  .btn {
    background-color: var(--primary-color-light);
    border: 2px solid white;
    border-color: var(--primary-color-dark);
    cursor: pointer;
    font-size: var(--main-font-size);
    padding: 15px 20px;
    width: 100%;
    max-width: 400px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .btn {
      transition: 0.25s background-color ease;
    }
  }

  .btn:active,
  .btn.active {
    background-color: var(--primary-color-dark);
    color: var(--primary-color-light);
  }

  .btn:hover {
    background-color: var(--primary-color-dark-10);
    color: var(--primary-color-dark);
  }

  @media (prefers-color-scheme: dark) {
    .btn {
      background-color: var(--primary-color-dark);
      border-color: var(--primary-color-light);
    }

    .btn:active,
    .btn.active {
      background-color: var(--primary-color-light);
      color: var(--primary-color-dark);
    }

    .btn:hover {
      background-color: var(--primary-color-light-25);
      color: var(--primary-color-light);
    }
  }

  main {
    margin-top: 16px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }

  .wikilink {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--main-font-size);
    text-decoration: underline;
  }

  @media (prefers-reduced-motion: no-preference) {
    a {
      transition: opacity 0.25s ease-in-out;
    }
  }

  a:hover {
    opacity: 0.5;
  }

  svg * {
    fill: var(--primary-color-dark);
  }

  @media (prefers-color-scheme: dark) {
    svg * {
      fill: var(--primary-color-light);
    }
  }

  body::-webkit-scrollbar {
    width: 0.5rem;
  }

  body::-webkit-scrollbar-track {
    background-color: var(--primary-color-dark-10);
  }

  @media (prefers-color-scheme: dark) {
    body::-webkit-scrollbar-track {
      background-color: var(--primary-color-light-25);
    }
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--primary-color-dark);
  }

  @media (prefers-color-scheme: dark) {
    body::-webkit-scrollbar-thumb {
      background-color: var(--primary-color-light);
    }
  }

  .gamepad-controls {
    text-align: right;
    font-size: var(--hint-font-size);
    position: fixed;
    bottom: 8px;
    right: 16px;
  }

  .gamepad-controls li {
    position: relative;
    padding-right: 2.5rem;
  }

  .gamepad-controls li:not(:last-of-type) {
    margin-bottom: 8px;
  }

  .gamepad-controls svg {
    max-width: 1.5rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .gamepad-controls svg * {
    fill: var(--primary-color-dark);
  }

  @media (prefers-color-scheme: dark) {
    .gamepad-controls svg * {
      fill: var(--primary-color-light);
    }
  }
</style>
