<template>
    <section class="app-main">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade-transform">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
  .app-main {
    /*60 = AppHeader  */
    min-height: calc(100vh - 60px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
