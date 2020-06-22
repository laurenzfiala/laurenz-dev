<template>
  <div class="container">
    <div class="home">
      test home
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bio',
  components: {}
}
</script>

<style scoped lang="less">
  @import (reference) '../theme/theme';

  .home {
    margin: (@g/2) @g;
    padding: @g;
    border: solid @borderColor @borderWidth;
    color: @textColor;
  }
</style>
