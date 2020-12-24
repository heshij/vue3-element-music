<template>
    <div class="sidebar-wrapper">
      <ul>
        <li>
          <router-link to="/home" tag="a">home</router-link>
        </li>
        <li>
          <router-link to="/about" tag="a">about</router-link>
        </li>
        <li>
          <router-link to="/test" tag="a">test</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;

  .sidebar-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 200px;
    height: 100%;
    background-color: skyblue;
    padding-top: 60px;
    ul {
      font-size: 16px;
      font-family: $font-stack;
      color: $primary-color;

      li {
        list-style: none;

        a {
          color: inherit;
          &.router-link-active {
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
