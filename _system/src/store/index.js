import { defineStore } from "pinia";
import router from "../router";
import { loadStateFromStorage, saveStateToStorage, resetApplicationProgress } from "./persistenceService";
import StoryService from "@/storyService";

const storyData = require("../../../story/config.json")
const achievementsText = require("../lang/achievements.json")

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

          const achievementInformation = document.createElement("div");
          const achievementsWrapper = document.getElementById("achievementsWrapper");
          const storyService = new StoryService();

          achievementInformation.innerHTML = `
            <p>${storyService.achievementsData[target.achievement].title[this.language]} ${achievementsText.wasUnlocked[this.language]}</p>
            <button></button>
          `
          achievementsWrapper.appendChild(achievementInformation);

          const buttons = achievementsWrapper.querySelectorAll("button");
          
          for (const thisButton of buttons) {
            thisButton.addEventListener("click", () => {
              achievementsWrapper.innerHTML = ""
            })
          }
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
