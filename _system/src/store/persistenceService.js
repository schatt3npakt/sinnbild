import StoryService from "@/storyService";

const storyService = new StoryService();

const initialAppstate = {
  languageChanged: false,
  language: storyService.storyLanguages[0],
  storyWasStarted: false,
  chapters: {
    current: storyService.firstChapter,
    revealed: [
      storyService.firstChapter
    ],
  },
  achievements: {
    revealed: []
  },
  scenes: {
    current: storyService.firstScene,
  },
  wiki: {
    current: storyService.firstWikiEntry,
  },
  options: {
    disableAnimatedLayers: false,
    currentTheme: storyService.firstTheme
  },
};

export const storageKey =
  "sinnbild-" + require("../../../story/config.json").projectKey;

export const loadStateFromStorage = () => {
  return JSON.parse(localStorage.getItem(storageKey));
}

export const saveStateToStorage = (state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export const resetApplicationProgress = () => {
  saveStateToStorage(initialAppstate);
  return loadStateFromStorage();
}

// Initialize App Sate if no State is found in browser storage
if (loadStateFromStorage() === null) {
  saveStateToStorage(initialAppstate)
}