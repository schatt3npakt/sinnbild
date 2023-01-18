<template>
  <div>
    <HeaderNavigation />

    <main id="mainContent">
      <router-view v-slot="{Component}">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import HeaderNavigation from "./components/HeaderNavigation.vue";
import { loadStateFromStorage } from './store/persistenceService';

export default {
  data() {
    return {
      storyConfig: require("../../story/config.json"),
      text: require("./lang/app.json"),
      language: loadStateFromStorage().language
    }
  },
  components: {
    HeaderNavigation,
  },
  methods: {
    focusSkipLinkTarget () {
      document.getElementById("mainContent").focus()
    }
  },
  mounted() {
    const storageState = loadStateFromStorage()
    const themeClass = storageState.options.currentTheme
    document.body.classList.add(themeClass)

    window.setInterval(() => {
      this.language = loadStateFromStorage().language
    }, 100)
    
    // Set metadata
    document.querySelector("title").innerHTML = this.storyConfig.title[this.language]
    document.querySelector("meta[name='description']").content = this.storyConfig.description[this.language]
  }
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
  max-width: 600px;
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
</style>
