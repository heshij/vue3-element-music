<template>
    <div class="songs-module" v-if="songList.length>0">
      <song-item :song-list="songList" @selectItem="selectItem"></song-item>
    </div>
</template>

<script>
import SongItem from './components/SongItem/SongItem'
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { createSong } from '../../utils/song'
import { getPlayListDetail, getSongDetail } from '../../api'
export default {
  name: 'songs',
  components: { SongItem },
  setup () {
    const selectItem = () => {
      console.log('selectItem')
    }
    const route = useRoute()
    const state = reactive({
      songList: []
    })
    const normalizedTrackIds = (list) => {
      const ret = []
      list.map(item => {
        if (item.id) {
          ret.push(item.id)
        }
      })
      return ret
    }
    const normalizedSongs = (list) => {
      const ret = []
      list.map(item => {
        if (item.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
    const _getPlayListDetail = async (id) => {
      const detailData = await getPlayListDetail(id, 8)
      const trackIds = detailData.playlist.trackIds
      await _getSongDetail(trackIds)
    }
    const _getSongDetail = async (list = []) => {
      const trackIds = normalizedTrackIds(list)
      const songListData = await getSongDetail(trackIds)
      state.songList = normalizedSongs(songListData.songs)
      console.log('songList:', state.songList)
    }
    onMounted(() => {
      const id = route.query.id
      setTimeout(() => {
        _getPlayListDetail(id)
      }, 300)
    })
    return {
      selectItem,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .songs-module {
    padding: 16px 0;
  }
</style>
