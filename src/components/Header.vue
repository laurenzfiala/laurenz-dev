<template>
  <nav class="header-container">
    <div class="header-line-left"></div>
    <router-link class="plain" to="/about">
      <div class="logo-container">
        <img class="logo" src="../assets/logo.png" />
      </div>
    </router-link>

    <div class="links-container">
      <div class="header-line flex-grow-1 d-none"></div>
      <router-link to="/about">about me</router-link>
      <router-link to="/blog">blog</router-link>
      <router-link to="/links">links</router-link>
      <router-link to="/games">games</router-link>
    </div>

    <div class="header-line ml-1 flex-grow-1"></div>

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
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  margin: @g4 @g;

  font-size: @fontSizeMd;
}

.header-line {
  height: @borderWidth;
  box-shadow: @linkBoxShadow;
}

.header-line-left {
  .header-line;

  width: @g2;
  margin-right: @g;
}

.logo-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  height: 2.25rem;
  margin: 0;

  .logo {
    height: 100%;
  }
}

@media @xs, @sm {
  .header-container {
    flex-direction: column;
    align-items: normal;

    margin-top: @g2;
    margin-bottom: @g2;
  }
  .header-line-left,
  .header-line {
    display: none;
  }
  .logo-container {
    margin-bottom: @g2;
  }
  .links-container {

    .header-line {
      display: block;
    }
  }
}

@currentPageArrow: ~"../assets/header-link-arrow.svg";
@currentPageArrowHover: ~"../assets/header-link-hover-arrow.svg";
@currentPageArrowWidth: 20px;
@currentPageArrowHeight: 12px;

.links-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  a {
    position: relative;

    display: flex;
    align-items: center;

    margin-left: @g;

    &:hover,
    &:focus,
    &.router-link-active {

      &:after {
        content: "";

        position: absolute;
        left: 50%;
        top: calc(100% - @borderWidth);

        width: @currentPageArrowWidth;
        height: @currentPageArrowHeight;

        background-repeat: no-repeat;

        transform: translateX(-50%);
        animation: a-page-arrow @transitionDur;
      }
    }

    &:hover,
    &:focus {
      &:after {
        background: url(@currentPageArrowHover);
      }
    }

    &.router-link-active {
      color: @linkColor;
      box-shadow: @linkBoxShadow;

      &:after {
        background: url(@currentPageArrow);
      }
    }
  }
}

  @keyframes a-page-arrow {
    0% {
      width: 0;
      height: 0;
    }
    100% {
      width: @currentPageArrowWidth;
      height: @currentPageArrowHeight;
    }
  }
</style>
