<template>
    <div class="song-list-wrap">
      <ul class="list-con">
        <li @click="selectItem" v-for="(item, index) in songList" :key="item.id">
          <span class="sort-num">{{index}}</span>
          <div class="icon-wrapper">
            <i class="icon-like"></i>
            <i class="icon-download"></i>
          </div>
          <span class="song-name">{{item.name}}</span>
          <span class="singer-name">{{item.singer}}</span>
          <span class="album-name">{{item.album}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'SongItem',
  props: {
    songList: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const selectItem = () => {
      ctx.emit('selectItem')
    }
    return {
      props,
      selectItem
    }
  }
}
</script>

<style scoped lang="scss">
  .list-con li {
    display: flex;
    justify-content: space-between;
  }
</style>
