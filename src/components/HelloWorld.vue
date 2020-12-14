<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/home" tag="a">home</router-link>
      </li>
      <li>
        <router-link to="/about" tag="a">about</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;

  ul {
    font-size: 16px;
    font-family: $font-stack;
    color: $primary-color;

    li {
      list-style: none;

      a {
        color: inherit;
        &.active {
          color: skyblue;
        }
      }
    }
  }
</style>
