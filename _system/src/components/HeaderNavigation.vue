<template>
  <header v-if="isLanguages === false" :class="{transparent: isMainMenu}">
    <nav aria-label="header navigation">
      <ul>
        <li class="main">
          <span v-if="isMainMenu">
            <InlineSVG aria-hidden="true" :src="require('../assets/icons/menu.svg')" />
            <span class="sr-only">{{text.toMainMenu[language]}}</span>
          </span>
          <router-link v-else to="/">
            <InlineSVG aria-hidden="true" :src="require('../assets/icons/menu.svg')" />
            <span class="sr-only">{{text.toMainMenu[language]}}</span>
          </router-link>
        </li>
        <li class="options">
          <span v-if="isOptions">
            <InlineSVG aria-hidden="true" :src="require('../assets/icons/options.svg')" />
            <span class="sr-only">{{text.toOptions[language]}}</span>
          </span>
          <router-link v-else to="options">
            <InlineSVG aria-hidden="true" :src="require('../assets/icons/options.svg')" />
            <span class="sr-only">{{text.toOptions[language]}}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { loadStateFromStorage } from '../store/persistenceService';
import InlineSVG from 'vue-inline-svg'

export default {
  components: {
    InlineSVG
  },
  computed: {
    isMainMenu () {
      return this.$route.name === "mainMenu"
    },
    isOptions () {
      return this.$route.name === "options"
    },
    isLanguages () {
      return this.$route.name === "languages"
    }
  },
  data() {
    return {
      text: require("../lang/header.json"),
      language: loadStateFromStorage().language
    }
  },
  name: "HeaderNavigation",
  mounted() {
    window.setInterval(() => {
      this.language = loadStateFromStorage().language
    }, 500)
  }
};
</script>

<style scoped>
header {
  background-color: var(--primary-color-light-50);
  position: sticky;
  top: 0;
  margin: auto;
  backdrop-filter: blur(4px);
  border: none;
  z-index: 2;
}

header.transparent {
  background-color: transparent;
  backdrop-filter: none;
}

@media (min-width: 720px) {
  header {
    margin: 0 20px;
  }
}

@media (prefers-color-scheme: dark) {
  header {
    background-color: var(--primary-color-dark-50);
  }
}

header ul {
  font-size: var(--main-font-size);
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

li > span {
  opacity: 0.5;
}

li.options {
  margin-left: auto;
}

a:hover svg {
  opacity: 0.5;
}

@media (prefers-reduced-motion: no-preference) {
  a:hover svg {
    transition: 0.25s opacity ease;
  }

  a,
  span {
    transition: 0.25s opacity ease;
  }
}
</style>