<template>
  <div>
    <AnimatedBackground v-if="storyStore.options.disableAnimatedLayers === false && storyStore.options.noAnimationsInMainMenu === false" />

    <h1 v-html="storyData.title[storyStore.language]"></h1>

    <h2 class="sr-only">{{ text.mainMenu[storyStore.language] }}</h2>

    <ul>
      <li>
        <router-link to="game">
          <span v-if="storyStore.storyWasStarted === false">{{ text.beginStory[storyStore.language] }}</span>
          <span v-else>
            {{ text.continueFrom[storyStore.language] }} 
            <span class="progress-hint">{{ chapterData[storyStore.chapters.current].title[storyStore.language] }}</span>
          </span>
        </router-link>
      </li>
      <hr />
      <li v-if="storyData.features.includes('chapters')"><router-link to="chapters">{{ text.chapterSelection[storyStore.language] }}</router-link></li>
      <li v-if="storyData.features.includes('achievements')"><router-link to="achievements">{{ text.achievements[storyStore.language] }}</router-link></li>
      <li v-if="storyData.features.includes('about')"><router-link to="about">{{ text.aboutThisProject[storyStore.language] }}</router-link></li>
      <li v-if="storyData.features.includes('wiki')"><router-link to="wiki">{{ text.wiki[storyStore.language] }}</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStoryStore } from "../store";
import StoryService from "../storyService";
import router from '../router';
import AnimatedBackground from "../components/AnimatedBackground.vue"

const storyService = new StoryService();

export default {
  name: "MainView",
  components: {
    AnimatedBackground
  },
  computed: {
    ...mapStores(useStoryStore),
  },
  data: () => {
    return {
      storyData: storyService.storyData,
      chapterData: storyService.chapterData,
      text: require("../lang/main.json")
    }
  },
  mounted() {
    if (this.storyStore.languageChanged === false && this.storyData.languages.length >= 2) {
      router.push("/languages")
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: var(--storytitle-font-size);
  font-family: var(--logo-font-family);
  margin: 32px 0 64px 0;
}

* {
  text-align: center;
  text-underline-offset: 4px;
}

ul {
  margin-bottom: 40px;
}

ul li a {
  font-size: var(--main-font-size);
  text-decoration: underline;
  position: relative;
}

ul li:not(:last-child) {
  margin-bottom: 16px;
}

hr {
  border-color: var(--primary-color-dark);
  max-width: 200px;
  margin: 24px auto 24px auto;
}

@media (prefers-color-scheme: dark) {
  hr {
    border-color: var(--primary-color-light);
  }
}

.progress-hint {
  font-weight: bold;
}
</style>