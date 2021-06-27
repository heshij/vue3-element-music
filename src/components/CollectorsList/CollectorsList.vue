<template>
    <div class="collectors-list-module">
      <ul class="collectors-list">
        <li v-for="item in collectorsList" :key="item.userId">
          <div class="img-wrap">
            <el-image :src="item.avatarUrl + '?param=100y100'" lazy>
              <template #placeholder>
                <div class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </template>
            </el-image>
          </div>
          <div class="text-wrap">
            <h4 :title="item.nickname">{{item.nickname}}</h4>
            <p :title="item.signature">{{item.signature}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'CollectorsList',
  props: {
    collectorsList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
  .collectors-list-module {
    padding: 16px 0;
    .collectors-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &:after {
        display: block;
        content: '';
        flex: 1;
      }
      > li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 25%;
        padding: 16px 6px;
        cursor: pointer;
        .img-wrap {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 1px solid $--border-color-base;
          overflow: hidden;
        }
        .text-wrap {
          flex: 1;
          padding-left: 12px;
          h4 {
            width: 100%;
            font-size: $--font-size-base;
            color: $--color-text-base;
            margin-bottom: 6px;
            @include multiline(1)
          }
          p {
            width: 100%;
            font-size: $--font-size-extra-small;
            color: $--color-text-secondary;
            line-height: 20px;
            @include multiline(2)
          }
        }
      }
    }
  }
</style>
