<template>
  <div id="app">
    <Header/>
    <router-view/>
    <!--<Footer/>-->
  </div>
</template>

<script>
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import Header from "@/components/Header";
  @Component({
    components: {Header}
  })
  export default class App extends Vue {
  }
</script>

<style lang="less">
  @import 'theme/theme';

  body {
    margin: 0;
  }

  #app {
    display: flex;
    flex-direction: column;

    min-height: 100vh;

    font-family: 'Now', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: @bgColor;
    color: @textColor;
  }
</style>
