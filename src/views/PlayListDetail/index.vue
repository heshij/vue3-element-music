<template>
  <div class="main-wrapper">
    <div class="detail-main" v-if="detail.id>0">
      <div class="img-wrap">
        <el-image :src="detail.coverImgUrl + '?param=200Y200'" lazy></el-image>
      </div>
      <div class="playlist-info--wrapper">
        <h5 class="playlist-title"><span class="tag">歌单</span>{{detail.name}}</h5>
        <div class="creator-info">
          <div class="img-wrap">
            <el-image :src="creator.avatarUrl+ '?param=50y50'" lazy></el-image>
          </div>
          <span class="creator-name">{{creator.nickname}}</span>
          <span>{{$filters.dateFormat(detail.createTime, 'YYYY-MM-DD')}} 创建</span>
        </div>
        <div class="btn-wrap">
          <span class="play-all-btn">
            <i class="icon-play"></i>
            播放全部
<!--            <i class="el-icon-plus"></i>-->
          </span>
          <span class="collect-btn">
            <i class="icon-collect-lists"></i>
            收藏({{$filters.tranNumber(detail.subscribedCount, 1)}})
          </span>
          <span class="share-btn">
            <i class="icon-share"></i>
            分享({{$filters.tranNumber(detail.shareCount, 1)}})
          </span>
        </div>
        <ul class="playlist-info">
          <li>
            <span>标签：<em class="tag" v-for="(item,index) in detail.tags" :key="index">{{item}}</em></span>
          </li>
          <li>
            <span>歌曲：<em>{{$filters.tranNumber(detail.trackCount)}}</em></span>
            <span>播放：<em>{{$filters.tranNumber(detail.playCount)}}</em></span>
          </li>
          <li>
            <span class="one-line">简介：<em>{{detail.description}}</em></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="playlist-main">
      <div class="second-level-nav" v-if="detail.id>0">
        <ul>
          <li @click="routeJump('songs')"><router-link to="/playlistDetail/songs">歌曲列表</router-link></li>
          <li @click="routeJump('comment')"><router-link to="/playlistDetail/comment">评论({{$filters.tranNumber(detail.commentCount, 1)}})</router-link></li>
          <li @click="routeJump('collectors')"><router-link to="/playlistDetail/collectors">收藏者</router-link></li>
        </ul>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlayListDetail } from '../../api'

export default {
  name: 'index',
  components: {},
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      detail: {},
      creator: {}
    })
    const routeJump = (routeName) => {
      const query = {
        id: state.detail.id
      }
      router.push({
        name: routeName,
        query
      })
    }
    const _getPlayListDetail = async (id) => {
      const detailData = await getPlayListDetail(id, 8)
      state.detail = detailData.playlist
      state.creator = detailData.playlist.creator
      // console.log('detail:', detailData.playlist)
      // console.log('creator:', detailData.playlist.creator)
    }
    onMounted(() => {
      const id = route.query.id
      setTimeout(() => {
        _getPlayListDetail(id)
      }, 300)
    })
    return {
      routeJump,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .main-wrapper {
    width: 100%;
    min-height: calc(100vh - 60px);
    padding-top: 20px;
    .detail-main {
      display: flex;
      justify-content: flex-start;
      padding-bottom: 20px;
      .img-wrap {
        width: 184px;
        height: 184px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid $--border-color-base;
      }
      .playlist-info--wrapper {
        width: 100%;
        flex: 1;
        padding-left: 20px;
        height: 184px;
        display: flex;
        align-content: space-between;
        flex-wrap: wrap;
        .playlist-title {
          width: 100%;
          font-size: $--font-size-extra-large;
          color: $--color-text-base;
          display: flex;
          align-items: center;
          .tag {
            font-weight: normal;
            display: inline-block;
            border-radius: 4px;
            border: 1px solid $theme-color;
            color: $theme-color;
            font-size: $--font-size-extra-small;
            padding: 0 5px;
            height: 22px;
            line-height: 22px;
            vertical-align: middle;
            margin-right: 4px;
          }
        }
        .creator-info {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: $--color-text-secondary;
          font-size: $--font-size-base;
          .img-wrap {
            width: 28px;
            height: 28px;
            border: 1px solid $--border-color-base;
            border-radius: 50%;
            margin-right: 12px;
          }
          .creator-name {
            color: #507daf;
            margin-right: 12px;
          }
        }
        .btn-wrap {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          > span {
            display: block;
            width: 140px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border: 1px solid $--border-color-base;
            font-size: $--font-size-base;
            color: $--color-text-base;
            margin-right: 18px;
            border-radius: 16px;
            cursor: pointer;
            &:hover {
              background-color: #f2f2f2;
            }
            i {
              margin-right: 4px;
            }
          }
          .play-all-btn {
            background-color: $theme-color;
            color: $--color-white;
            border-color: $theme-color;
            &:hover {
              background-color: #CC3232;
            }
          }
        }
        .playlist-info {
          width: 100%;
          > li {
            display: flex;
            margin-top: 10px;
            &:first-child {
              margin-top: 0;
            }
            span {
              font-size: $--font-size-base;
              color: $--color-text-base;
              margin-right: 24px;
              em {
                color: $--color-text-secondary;
              }
              .tag {
                color: #507daf;
              }
              .tag:after {
                display: inline-block;
                content: '/';
                margin: 0 6px;
                color: $--color-text-secondary;
              }
              .tag:last-child:after {
                display: none;
              }
            }
            .one-line {
              @include multiline($num: 1);
            }
          }
        }
      }
    }
    .second-level-nav ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      margin: 0;
      padding: 0;
      > li {
        list-style: none;
        padding: 4px 0;
        position: relative;
        margin-right: 12px;
        >a {
          position: relative;
          display: block;
          width: 100%;
          height: 34px;
          padding: 0 8px;
          line-height: 34px;
          border-radius: 4px;
          color: $--color-text-base;
          text-align: center;
          transition: all .28s;
          &:after {
            display: block;
            content: '';
            width: 40px;
            height: 4px;
            border-radius: 2px;
            background-color: $theme-color;
            margin: 0 auto;
            opacity: 0;
            transition: opacity .28s;
          }
          &.router-link-active {
            color: $--color-text-active;
            font-size: $--font-size-medium;
            font-weight: 700;
          }
          &:hover::after,&.router-link-active::after {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
