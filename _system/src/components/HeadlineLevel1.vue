<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: "HeadlineLevel1"
}
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
  text-align: left;
}

@media (min-width: 720px) {
  h1 {
    margin-bottom: 64px;
  } 
}
</style>