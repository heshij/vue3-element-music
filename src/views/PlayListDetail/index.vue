<template>
  <div class="main-wrapper">
    <song-item :song-list="songList" @selectItem="selectItem"></song-item>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail, getSongDetail } from '../../api'
import { createSong } from '../../utils/song'
import SongItem from '../../components/SongItem/SongItem'

export default {
  name: 'index',
  components: { SongItem },
  setup () {
    const selectItem = () => {
      console.log('selectItem')
    }
    const route = useRoute()
    const state = reactive({
      detail: {},
      creator: {},
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
      state.detail = detailData.playlist
      state.creator = detailData.playlist.creator
      await _getSongDetail(trackIds)
      console.log('detail:', detailData.playlist)
      console.log('creator:', detailData.playlist.creator)
    }
    const _getSongDetail = async (list = []) => {
      const trackIds = normalizedTrackIds(list)
      const songListData = await getSongDetail(trackIds)
      state.songList = normalizedSongs(songListData.songs)
      console.log('songList:', state.songList)
    }
    onMounted(() => {
      const id = route.query.id
      _getPlayListDetail(id)
    })
    return {
      selectItem,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
  .main-wrapper {
    width: 100%;
    min-height: calc(100vh - 60px);
    padding-top: 20px;
  }
</style>
