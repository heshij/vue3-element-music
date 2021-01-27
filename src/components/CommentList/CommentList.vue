<template>
    <div class="comment-list-module">
      <h2>{{commentsListTitle}}</h2>
      <ul class="comment-list">
        <li v-for="item in commentsList" :key="item.commentId">
          <div class="img-wrap">
            <el-image :src="item.user.avatarUrl + '?param=50y50'" lazy></el-image>
          </div>
          <div class="text-wrap">
            <div class="comment-content">
              <span>{{item.user.nickname}}:</span>
              <p>{{item.content}}</p>
            </div>
            <div class="user-handle">
              <span>{{$filters.dateFormat(item.time, 'YYYY-MM-DD HH:MM:SS')}}</span>
              <ul class="handle-list">
                <li><span class="icon-star"></span>&nbsp;<em>{{item.likedCount}}</em></li>
                <li><span class="icon-share"></span></li>
                <li><span class="icon-comment"></span></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    commentsListTitle: {
      type: String,
      default: '最新评论'
    },
    commentsList: {
      type: Array,
      default: () => []
    }
  },
  setup () {
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .comment-list-module {
    padding: 16px 0;
    > h2 {
      font-size: $--font-size-medium;
      color: $--color-text-base;
    }
    .comment-list {
      overflow: hidden;
      > li {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        padding: 16px 0;
        border-top: 1px solid $--border-color-base;
        font-size: $--font-size-base;
        &:first-child {
          border-top: none;
        }
        .img-wrap {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid $--border-color-base;
          margin-top: 8px;
        }
        .text-wrap {
          flex: 1;
          width: calc(100% - 36px);
          padding-left: 14px;
          .comment-content {
            overflow: hidden;
            color: $--color-text-base;
            width: 100%;
            span{
              display: block;
              max-width: 100px;
              line-height: 24px;
              color: #507daf;
              @include multiline(1);
              float: left;
              margin-right: 12px;
            }
            p {
              line-height: 24px;
              text-align: justify;
            }
          }
          .user-handle {
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            padding-top: 8px;
            > span {
              display: block;
              color: $--color-text-secondary;
            }
            .handle-list {
              display: flex;
              justify-content: flex-start;
              flex-wrap: nowrap;
              align-items: center;
              > li {
                font-size: $--font-size-medium;
                color: $--color-text-base;
                display: flex;
                cursor: pointer;
                &:first-child:before {
                  display: none;
                }
                &:before {
                  display: block;
                  content: '|';
                  color: $--color-text-secondary;
                  font-size: $--font-size-small;
                  margin: 0 10px;
                }
                &:hover {
                  color: $theme-color;
                }
                em {
                  display: inline-block;
                  font-weight: lighter;
                  font-size: $--font-size-small;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
