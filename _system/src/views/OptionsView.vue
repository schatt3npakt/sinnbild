<template>
  <div>
    <HeadlineLevel1>{{text.options[storyStore.language]}}</HeadlineLevel1>

    <form>
      <!-- <label for="Textvergrößerung">Textvergrößerung</label>
      <input
        @input="handleInput($event.target)"
        type="range"
        min="0"
        :value="storyStore.options.textZoom"
        step="0.1"
        max="2.5"
        name="Textvergrößerung"
        id="textZoom"
      /> -->

      <div class="options-category">
        <HeadlineLevel2>{{text.displayOptions[storyStore.language]}}</HeadlineLevel2>

        <button class="btn" type="button" @click="handleFullscreenToggle()">{{fullScreenText}}</button>
      </div>

      <div class="options-category" v-if="storyData.languages.length >= 2">
        <HeadlineLevel2>{{text.languageOptions[storyStore.language]}}</HeadlineLevel2>

        <div v-for="lang in storyData.languages" :key="lang">
          <button
            class="btn btn--theme"
            :class="{active: lang === storyStore.language}"
            :id="lang"
            type="button"
            @click="handleLangButton(lang)"
          >
            {{languages[lang][storyStore.language]}}
          </button>
        </div>
      </div>

      <div v-if="storyStore.options.noAnimationsInMainMenu === false" class="options-category">
        <HeadlineLevel2>{{text.visuals[storyStore.language]}}</HeadlineLevel2>

        <button v-if="storyStore.options.disableAnimatedLayers === false" class="btn" @click="handleAnimatedLayersButton()">
          {{text.disableAnimatedLayers[storyStore.language]}}
        </button>
        <button v-else class="btn" @click="handleAnimatedLayersButton()">
          {{text.enableAnimatedLayers[storyStore.language]}}
        </button>
      </div>

      <div class="options-category" v-if="storyData.themes.length >= 2">
        <HeadlineLevel2>{{text.theme[storyStore.language]}}</HeadlineLevel2>

        <div v-for="theme in storyData.themes" :key="theme.id">
          <button
            class="btn btn--theme"
            :class="{active: theme.id === storyStore.options.currentTheme}"
            :id="theme.id"
            type="button"
            @click="handleThemeButton(theme.id)"
          >
            {{theme.title[storyStore.language]}}
          </button>
        </div>
      </div>

     <div class="options-category">
        <HeadlineLevel2>{{text.resetProgress[storyStore.language]}}</HeadlineLevel2>

        <button class="btn" v-if="reallyReset === false" @click="handleResetButton()">
          {{text.resetProgress[storyStore.language]}}
        </button>
        <button class="btn" v-else @click="handleResetButton()">
          {{text.reallyResetProgress[storyStore.language]}}
        </button>
      </div>

      <!--
      <label for="checkbox1">Test</label>
      <input type="checkbox" name="checkbox1" id="checkbox1" />

      <label for="checkbox2">Test</label>
      <input type="checkbox" name="checkbox2" id="checkbox2" />

      <label for="option1">Option 1</label>
      <input type="radio" id="option1" name="radio" value="Option 1" />
      <label for="option2">Option 2</label>
      <input type="radio" id="option2" name="radio" value="Option 2" />
      -->
    </form>
  </div>
</template>

<script>
import { useStoryStore } from "../store";
import {mapStores} from "pinia";
import screenfull from "screenfull";
import HeadlineLevel1 from "../components/HeadlineLevel1.vue";
import HeadlineLevel2 from "../components/HeadlineLevel2.vue";
import StoryService from '../storyService';
import router from '../router';

const optionsText = require("../lang/options.json")
const storyService = new StoryService()

export default {
  name: "OptionsView",
  components: {
    HeadlineLevel1,
    HeadlineLevel2
  },
  computed: {
    ...mapStores(useStoryStore)
  },
  data: function () {
    return {
      reallyReset: false,
      storyData: storyService.storyData,
      text: optionsText,
      fullScreenText: "",
      languages: require("../lang/languages.json")
    }
  },
  methods: {
    handleInput (target) {
      this.storyStore.handleOptionsChange(target.id, target.value);
    },
    handleFullscreenToggle () {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }

      this.fullScreenText = screenfull.isFullscreen ? this.text.fullScreenOff[this.storyStore.language]:this.text.fullScreenOn[this.storyStore.language]
    },
    handleLangButton (lang) {
      this.storyStore.handleLangChange(lang)
    },
    handleThemeButton (theme) {
      for (let themeItem of storyService.storyData.themes) {
        document.body.classList.remove(themeItem.id)
      }

      document.body.classList.add(theme)
      this.storyStore.handleOptionsChange("currentTheme", theme)
    },
    handleResetButton () {
      if (this.reallyReset === false) {
        this.reallyReset = true

        window.setTimeout(() => {
          this.reallyReset = false
        }, 2000)
      } else {
        this.storyStore.handleResetButton()
        router.push("/")
        this.reallyReset = false
      }
    },
    handleAnimatedLayersButton () {
      this.storyStore.handleOptionsChange("disableAnimatedLayers", !this.storyStore.options.disableAnimatedLayers)
    }
  },
  mounted () {
      this.fullScreenText = screenfull.isFullscreen ? this.text.fullScreenOn[this.storyStore.language]:this.text.fullScreenOff[this.storyStore.language]
  }
};
</script>

<style scoped>
.options-category {
  margin-bottom: 32px;
}

@media (min-width: 720px) {
  .options-category {
    margin-bottom: 64px;
  }
}

.btn {
  display: block;
  margin: auto;
  text-align: center;
}

.btn--theme {
  margin-top: 20px;
}
</style>