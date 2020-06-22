<template>
  <div class="container">
    <nav class="header-container">
      <div class="logo-container">
        <img class="logo" src="../assets/logo.png" />
      </div>

      <div class="links-container">
        <router-link class="link" to="/bio">Bio</router-link>
        <router-link class="link" to="/links">Links</router-link>
        <router-link class="link" to="/games">Board Games</router-link>
        <router-link class="link" to="/projects">Projects</router-link>
      </div>

    </nav>
  </div>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: @g2 0;
  padding: @g2;

  border-radius: 100px;
  font-weight: 200;
  font-size: @fontSizeMd;

  background-color: @bgColorDark;
}

.logo-container {
  margin: -@g2;

  .logo {
    height: 100%;
  }
}

.links-container {
  display: flex;
  flex-direction: row;

  .link {
    display: flex;
    align-items: center;

    padding: 0 @g2;
  }
}
</style>
