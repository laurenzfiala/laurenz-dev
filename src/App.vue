<template>
  <div id="app">
    <Header/>
    <div class="content container">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  @Component({
    components: {Header, Footer}
  })
  export default class App extends Vue {
  }
</script>

<style lang="less">
  @import 'theme/theme';

  body {
    margin: 0;

    &.no-scroll {
      overflow: hidden;
    }
  }

  #app {
    display: flex;
    flex-direction: column;

    min-height: 100vh;

    font-family: 'Acari Sans Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: @bgColor;
    color: @textColor;

    line-height: @lineHeight;

    > .content {
      flex-grow: 1;
    }
  }
</style>
