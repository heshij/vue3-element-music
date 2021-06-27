<template>
    <div class="songs-module">
      <song-item :song-list="songList" :loading="loading"></song-item>
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
    const route = useRoute()
    const state = reactive({
      loading: true,
      songList: []
    })
    const normalizedTrackIds = (list) => {
      const ret = []
      // eslint-disable-next-line array-callback-return
      list.map(item => {
        if (item.id) {
          ret.push(item.id)
        }
      })
      return ret
    }
    const normalizedSongs = (list) => {
      const ret = []
      // eslint-disable-next-line array-callback-return
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
      // console.log('songList:', state.songList)
    }
    onMounted(() => {
      state.loading = true
      const id = route.query.id
      _getPlayListDetail(id)
      state.loading = false
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
  .songs-module {
    padding: 16px 0;
  }
</style>
