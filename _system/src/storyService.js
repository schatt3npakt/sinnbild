const storyData = require("../../story/config.json");
const activeScenes = storyData.scenes;
const activechapters = storyData.chapters;
let sceneData = {};
let chapterData = {};

const buildSceneData = () => {
  for (let scene of activeScenes) {
    sceneData[scene] = require("../../story/scenes/" + scene + ".json");
  }

  return sceneData;
};

const buildChapterData = () => {
  for (let chapter of activechapters) {
    chapterData[chapter] = require("../../story/chapters/" + chapter + ".json");
  }

  return chapterData;
};

// Loads and serves story data from JSON structures
export default class StoryService {
  constructor() {
    this.firstChapter = storyData.firstChapter;
    this.firstScene = storyData.firstScene;
    this.firstWikiEntry = storyData.firstWikiEntry;
    this.firstTheme = storyData.firstTheme;
    this.storyLanguages = storyData.languages;
    this.storyThemes = storyData.themes;
    this.chapterData = buildChapterData();
    this.sceneData = buildSceneData();
    this.storyData = storyData;
    this.wikiData = require("../../story/wiki.json");
    this.achievementsData = require("../../story/achievements.json");
  }
}
