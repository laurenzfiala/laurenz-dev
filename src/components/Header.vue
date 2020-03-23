<template>
  <nav class="header-container">

    <div class="left">
      <img class="logo" src="../assets/logo.png" />
    </div>

    <div class="right">
      <router-link class="link-container" active-class="active" to="/"><div class="link">Home</div></router-link>
      <router-link class="link-container" to="/"><div class="link">Bio</div></router-link>
      <router-link class="link-container" to="/"><div class="link">Recreation</div></router-link>
      <a class="link-container" href="https://github.com/laurenzfiala" target="_blank"><div class="link">Github</div></a>
    </div>

  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>

<style scoped lang="less">
@import (reference) '../theme/theme';

.header-container {
  padding: @g2 @g3;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-weight: 200;
  font-size: @fontSizeLg;

  .logo {
    height: 50px;
  }

  .right {
    display: flex;
    flex-direction: row;

    margin-right: -@g;

    a {
      display: flex;
      align-items: center;

      padding: @g;
      margin-right: @g;
    }
  }

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
