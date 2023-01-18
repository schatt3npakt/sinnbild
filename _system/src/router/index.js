import { createRouter, createWebHashHistory } from "vue-router";
import GameView from "../views/GameView.vue";
import OptionsView from "../views/OptionsView.vue";
import MainView from "../views/MainView.vue";
import ChapterSelectionView from "../views/ChapterSelectionView.vue";
import AboutView from "../views/AboutView.vue";
import WikiView from "../views/WikiView.vue";
import AchievementsView from "../views/AchievementsView.vue";
import LanguageView from "../views/LanguageView.vue";

const routes = [
  {
    path: "/",
    name: "mainMenu",
    component: MainView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
  {
    path: "/options",
    name: "options",
    component: OptionsView,
  },
  {
    path: "/chapters",
    name: "chapters",
    component: ChapterSelectionView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/wiki",
    name: "wiki",
    component: WikiView,
  },
  {
    path: "/achievements",
    name: "achievements",
    component: AchievementsView,
  },
  {
    path: "/languages",
    name: "languages",
    component: LanguageView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
