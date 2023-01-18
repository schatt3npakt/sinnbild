<template>
  <div>
    <div class="wrapper">
      <HeadlineLevel1>{{text.aboutThisProject[storyStore.language]}}</HeadlineLevel1>

      <p v-html="storyData.about[storyStore.language]"></p>
    </div>

    <div class="wrapper" v-if="storyData.contentWarnings.length >= 1">
      <HeadlineLevel2>{{ text.contentWarning[storyStore.language] }}</HeadlineLevel2>

      <p>{{ text.contentWarningBody[storyStore.language] }}</p>

      <ul>
        <li v-for="type in storyData.contentWarnings" :key="type">
          {{type[storyStore.language]}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useStoryStore } from '../store';
import StoryService from '../storyService';
import HeadlineLevel1 from '../components/HeadlineLevel1.vue'
import HeadlineLevel2 from '../components/HeadlineLevel2.vue'

const storyService = new StoryService();

export default {
  name: "AboutView",
  components: {
    HeadlineLevel1,
    HeadlineLevel2
  },
  data() {
    return {
      storyData: storyService.storyData,
      text: require("../lang/about.json")
    }
  },
  computed: {
    ...mapStores(useStoryStore)
  },
};
</script>

<style scoped>
ul {
  margin-left: 16px;
}

ul li {
  list-style-type: upper-roman;
}

li {
  font-size: var(--main-font-size);
  list-style-type: none;
}

.wrapper {
  margin-bottom: 32px;
}
</style>