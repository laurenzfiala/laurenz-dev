<template>
  <div class="footer-wrapper">
    <footer class="footer-container">
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
}

.footer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: @g4 @g3;
  margin-right: @g;
  margin-bottom: @g;
  margin-left: @g;

  font-size: @fontSizeSm;
  color: @subtleTextColor;

  border-bottom: solid (@borderWidth + 1px) @borderColor;

  .version {
    color: @subtleTextColor;
  }
}
</style>
