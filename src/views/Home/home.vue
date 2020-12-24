<template>
    <div class="home-wrapper">
      <h1 v-for="(itme, index) in list" :key="index">this is home page{{index}}{{itme}}</h1>
    </div>
</template>

<script>
export default {
  name: 'home',
  setup () {
    const list = [1, 2, 3]
    return {
      list
    }
  }
}
</script>

<style scoped>
.home-wrapper {
  width: 100%;
}
</style>
