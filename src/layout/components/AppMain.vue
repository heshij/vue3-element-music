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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AppMain',
  setup () {
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })
    return {
      key
    }
  }
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
