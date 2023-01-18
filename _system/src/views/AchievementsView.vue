<template>
  <div>
    <HeadlineLevel1>{{text.achievements[storyStore.language]}}</HeadlineLevel1>

    <ul>
      <li v-for="achievement in achievementsData" :key="achievement.title">
        <div v-if="storyStore.achievements.revealed.includes(achievement.id)">
          <HeadlineLevel2>{{ achievement.title[storyStore.language] }}</HeadlineLevel2>
          <p>{{ achievement.description[storyStore.language] }}</p>
        </div>

        <div v-else>
          <HeadlineLevel2>???</HeadlineLevel2>
          <p>{{text.achievementHasNotBeenUnlocked[storyStore.language]}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useStoryStore } from "../store";
import StoryService from "../storyService";
import HeadlineLevel1 from "../components/HeadlineLevel1.vue"
import HeadlineLevel2 from "../components/HeadlineLevel2.vue"

const storyService = new StoryService();

export default {
  name: "AchievementsView",
  components: {
    HeadlineLevel1,
    HeadlineLevel2
  },
  data: () => {
    return {
      achievementsData: storyService.achievementsData,
      text: require("../lang/achievements.json")
    }
  },
  computed: {
    ...mapStores(useStoryStore),
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 32px;
}

li {
  font-size: var(--main-font-size);
  margin-bottom: 64px;
}
</style>