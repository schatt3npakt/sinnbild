<template>
  <div class="scene-outer" :class="[sceneData[storyStore.scenes.current].image?.reverseAlign ? 'reverse' : '']">
    <img
      v-if="sceneData[storyStore.scenes.current].image"
      aria-hidden="true"
      :src="sceneData[storyStore.scenes.current].image.src"
      width="300"
      height="500"
      :class="[storyStore.chapters.current, showTransition ? 'transition' : '']"
      alt=""
    />

    <div
      aria-live="polite"
      class="scene-wrapper"
      :class="[storyStore.chapters.current, showTransition ? 'transition' : '']"
    >
      <HeadlineLevel1 v-if="sceneData[storyStore.scenes.current].headline">
        {{ sceneData[storyStore.scenes.current].headline[storyStore.language] }}
      </HeadlineLevel1>

      <p
        v-if="sceneData[storyStore.scenes.current].text"
        v-html="parsedGameText"
      ></p>

      <div
        class="decision-wrapper"
        v-if="sceneData[storyStore.scenes.current].choices"
      >
        <button
          class="btn active"
          type="button"
          v-for="choice in sceneData[storyStore.scenes.current].choices"
          :key="choice.text"
          @click="buttonClickHandler(choice)"
        >
          {{ choice.text[storyStore.language] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapStores } from "pinia";
  import { useStoryStore } from "../store/index";
  import StoryService from "../storyService";
  import HeadlineLevel1 from "../components/HeadlineLevel1.vue";

  const storyService = new StoryService();
  const gameText = require("../lang/game.json");

  const wikiLinkReplacer = (match) => {
    const storyStore = useStoryStore();
    const splitted = match.split("??");
    splitted[0] =
      "<a href='#' title='" +
      gameText.searchWiki[storyStore.language] +
      storyService.wikiData[splitted[1]].title[storyStore.language] +
      "' class='wikilink' data-target='" +
      splitted[1] +
      "'>";
    splitted[1] = storyService.wikiData[splitted[1]].title[storyStore.language];
    splitted[2] = "</a>";
    return splitted.join("");
  };
  const wikiRegex = /(\?\?)([^?#]*)(\?\?)/gi;

  const applyWikiEventListeners = () => {
    const wikiLinks = document.getElementsByClassName("wikilink");
    for (const link of wikiLinks) {
      link.addEventListener("click", (evt) => {
        event.preventDefault();
        wikiLinkHandler(evt);
      });
    }
  };

  const wikiLinkHandler = (element) => {
    const storyStore = useStoryStore();
    storyStore.handleWikiChange(element.target.attributes["data-target"].value);
  };

  export default {
    name: "GameView",
    components: {
      HeadlineLevel1,
    },
    data: () => {
      return {
        sceneData: storyService.sceneData,
        showTransition: false,
      };
    },
    computed: {
      parsedGameText() {
        return this.sceneData[this.storyStore.scenes.current].text[
          this.storyStore.language
        ].replace(wikiRegex, wikiLinkReplacer);
      },
      ...mapStores(useStoryStore),
    },
    methods: {
      buttonClickHandler(target) {
        this.showTransition = true;
        window.setTimeout(() => {
          window.scrollTo(0, 0);
          this.showTransition = false;
          this.storyStore.handleSceneChange(target);
        }, 500);
        window.setTimeout(applyWikiEventListeners, 100);
      },
    },
    mounted() {
      applyWikiEventListeners();
    },
  };
</script>

<style scoped>
  h1 {
    font-size: var(--scenetitle-font-size);
    margin-bottom: 16px;
  }

  .btn {
    display: block;
    margin: 16px auto 0 auto;
  }

  .decision-wrapper {
    margin-top: 32px;
  }

  @media (min-width: 720px) {
    .decision-wrapper {
      margin-top: 64px;
    }
  }

  .scene-wrapper {
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    .scene-wrapper {
      transition: opacity 0.5s ease;
    }
  }

  .scene-wrapper::after {
    display: block;
    opacity: 1;
    pointer-events: none;
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    background: linear-gradient(
      0,
      var(--primary-color-light),
      var(--primary-color-light-0)
    );
  }

  @media (prefers-color-scheme: dark) {
    .scene-wrapper::after {
      background: linear-gradient(
        0,
        var(--primary-color-dark),
        var(--primary-color-dark-0)
      );
    }
  }

  p {
    text-align: justify;
    line-height: 1.25;
    margin-bottom: 16px;
  }

  .transition {
    opacity: 0;
  }

  .scene-outer {
    display: flex;
    gap: 32px;
  }

  .scene-outer.reverse {
    flex-direction: row-reverse;
  }

  img {
    display: none;
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    img {
      transition: opacity 0.5s ease;
    }
  }


  @media (min-width: 720px) {
    img {
      width: 300px;
      height: 500px;
      object-fit: cover;
      object-position: center center;
      display: block;
      align-self: flex-start;
      background-color: var(--primary-color-light);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    img {
      animation: loading 2s linear infinite;
    }
  }

  @keyframes loading {
    50% {
      background-color: var(--primary-color-light-75);
    }
  }
</style>
