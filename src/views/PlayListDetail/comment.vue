<template>
    <div class="comment-module" v-if="comments.length>0">
      <comment-list :comments-list="hotComments" :comments-list-title="commentsTitle" v-if="hotComments!==undefined"></comment-list>
      <comment-list :comments-list="comments"></comment-list>
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="limit"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { getPlayListComment } from '../../api'
import CommentList from '../../components/CommentList/CommentList'
export default {
  name: 'comment',
  components: {
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
      offset: 0,
      currentPage: 0
    })
    const handleSizeChange = (val) => {
      state.limit = val
      state.offset = state.limit * state.currentPage
      _getPlayListComment()
    }
    const handleCurrentChange = (val) => {
      state.currentPage = val
      state.offset = (val - 1) * state.limit
      _getPlayListComment()
    }
    const _getPlayListComment = async () => {
      const params = {
        id: route.query.id,
        limit: state.limit,
        offset: state.offset
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
      _getPlayListComment()
    })
    return {
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .comment-module {
    padding: 16px 0;
  }
</style>
