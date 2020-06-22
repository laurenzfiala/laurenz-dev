<template>
  <div class="footer-wrapper">
    <footer class="footer-container container">
      <div>
        &copy; Laurenz Fiala {{ currentYear }}
      </div>
      <div class="text-align-right">
        <div class="version">v1.0.0</div>
      </div>
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
  box-shadow: inset 0 -@borderWidth 0 @borderColor;
}

.footer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-top: @g4;
  padding-bottom: @g4;

  font-size: @fontSizeMd;

  .version {
    color: @subtleTextColor;
  }
}
</style>
