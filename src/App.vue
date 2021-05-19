<template>
  <div id="app">
    <div class="navbar1">
      <books></books>
    </div>
  </div>
</template>

<script>
import Books from "./components/Books.vue";
import bookService from './services/booksService.js'


export default {
  name: "app",
  components: {
    Books,
    bookService
    
  }
};
</script>

<style lang="scss">
@import "./styles/main.scss";

.navbar1 {
  background-color: orange;
  width: 100%;
  height: 96px;
  position: absolute;
  z-index: 0;
}

</style>
