<template>
  <div class="not-found">
    404 <small>Not found</small>
  </div>
</template>

<style scoped lang="less">
  @import (reference) '../theme/theme';

  .not-found {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: @g2;

    font-size: @fontSizeXl;

    small {
      margin-left: @g;

      color: @subtleTextColor;
      font-size: @fontSizeMd;
    }
  }
</style>
