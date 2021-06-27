<template>
    <div class="comment-module" v-if="comments.length>0">
      <comment-list :comments-list="hotComments" :comments-list-title="commentsTitle" v-if="hotComments!==undefined && hotComments.length>0"></comment-list>
      <comment-list :comments-list="comments"></comment-list>
      <pagination :total="pageTotal" :limit="limit" @pagination="handlePlayListComment"></pagination>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { getPlayListComment } from '../../api'
import CommentList from '../../components/CommentList/CommentList'
import Pagination from '../../components/Pagination/Pagination'
export default {
  name: 'comment',
  components: {
    Pagination,
    CommentList
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      commentsTitle: '精彩评论',
      comments: [],
      hotComments: [],
      pageTotal: 0,
      limit: 16,
      offset: 0
    })
    const handlePlayListComment = async (query) => {
      const params = {
        id: route.query.id,
        limit: query !== undefined ? query.limit : state.limit,
        offset: query !== undefined ? query.offset : state.offset
      }
      const commentData = await getPlayListComment(params)
      state.comments = commentData.comments
      state.hotComments = commentData.hotComments
      state.pageTotal = commentData.total
      // console.log('playListComment', commentData)
      console.log('comments', commentData.comments)
      console.log('hotComments', commentData.hotComments)
    }
    onMounted(() => {
      handlePlayListComment()
    })
    return {
      handlePlayListComment,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-module {
    padding: 16px 0;
  }
</style>
