<template>
  <div class="layer">
    <div class="inner">
      <h1>{{ text.chooseYourLanguage[storyStore.language] }}</h1>

      <ul>
        <li v-for="lang in storyData.languages" :key="lang">
          <button class="btn" @click="handleLangButton(lang)">
            {{ languages[lang][storyStore.language] }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStoryStore } from "../store";
import StoryService from "../storyService";
import router from '../router';

const storyService = new StoryService();

export default {
  name: "LanguageView",
  computed: {
    ...mapStores(useStoryStore),
  },
  data: () => {
    return {
      storyData: storyService.storyData,
      text: require("../lang/languageview.json"),
      languages: require("../lang/languages.json")
    }
  },
  methods: {
    handleLangButton (lang) {
      this.storyStore.handleLangChange(lang)
      router.push("/")
    }
  }
};
</script>

<style scoped>
.layer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding: 15px;
  text-align: center;
  z-index: 1;
}

.layer h1 {
  margin-bottom: 25px;
}

.layer li {
  display: block;
  margin-bottom: 15px;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.inner h1 {
  white-space: nowrap;
  margin-bottom: 32px;
}
</style>
