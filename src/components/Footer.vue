<template>
  <div class="footer-wrapper">
    <footer class="footer-container">
      <div class="footer-line mr-1 fixed"></div>
      <router-link class="imprint" to="/imprint">Imprint</router-link>
      <div>&copy; Laurenz Fiala {{ currentYear }}</div>
      <div class="footer-line mx-1"></div>
      <div class="text-align-right">
        <div class="version">v1.0.0</div>
      </div>
      <div class="footer-line ml-1 fixed"></div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  public currentYear: string = new Date().getFullYear() + '';
}
</script>

<style scoped lang="less">
@import (reference) '../theme/theme';

.footer-wrapper {
}

.footer-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  padding: @g 0;
  margin-right: @g;
  margin-bottom: @g;
  margin-left: @g;

  font-size: @fontSizeMd;
  color: @textColor;

  a {
    padding-bottom: @linkBorderSpacingLg;
  }
}

.imprint {
  margin-right: @g;
}

.footer-line {
  height: @borderWidth;
  flex-grow: 1;

  box-shadow: @linkBoxShadow;

  &.fixed {
    width: @g2;
    flex-grow: 0;
  }
}

@media @xs, @sm {
  .footer-container {
    flex-direction: column;

    padding: @g 0;
  }
  .footer-line {
    display: none;
  }
  .imprint {
    margin-right: 0;
  }
}
</style>
