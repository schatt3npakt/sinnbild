<template>
  <h2>
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: "HeadlineLevel2"
}
</script>

<style scoped>
h2 {
  margin-bottom: 16px;
  text-align: left;
}

@media (min-width: 720px) {
  h2 {
    margin-bottom: 32px;
  } 
}
</style>