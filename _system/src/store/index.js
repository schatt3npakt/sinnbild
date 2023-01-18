import { defineStore } from "pinia";
import router from "../router";
import "../gamepadService";
import { loadStateFromStorage, saveStateToStorage, resetApplicationProgress } from "./persistenceService";

const storyData = require("../../../story/config.json")

export const useStoryStore = defineStore("story", {
  state: () => loadStateFromStorage(),
  actions: {
    handleSceneChange(target) {
      this.scenes.current = target.target;
      this.chapters.current = target.chapter;
      this.storyWasStarted = true;

      if (this.chapters.revealed.includes(target.chapter) === false) {
        this.chapters.revealed.push(target.chapter);
      }

      if (target.achievement) {
        if (this.achievements.revealed.includes(target.achievement) === false) {
          this.achievements.revealed.push(target.achievement);
        }
      }

      saveStateToStorage(this);
    },
    handleChapterChange(target) {
      router.push("/game");
      this.storyWasStarted = true;
      this.scenes.current = target.target;
      this.chapters.current = target.id;
    },
    handleWikiChange(target) {
      router.push("/wiki");
      this.wiki.current = target;
      saveStateToStorage(this)
    },
    handleLangChange(language) {
      this.language = language
      this.languageChanged = true
      document.documentElement.setAttribute("lang", language);
      document.querySelector("title").innerHTML = storyData.title[language]
      document.querySelector("meta[name='description']").content = storyData.description[language]
      saveStateToStorage(this)
    },
    handleOptionsChange (optionKey, value) {
      this.options[optionKey] = value;
      saveStateToStorage(this);
    },
    handleResetButton () {
      resetApplicationProgress()
      Object.assign(this, resetApplicationProgress())
    },
  },
});
