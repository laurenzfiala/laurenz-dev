<template>
  <div class="btn-group" v-bind:class="{'dropdown-open': isShown}">
    <slot name="button" />
    <div class="btn-group-append">
      <button @click="toggle()" :class="{'active': isShown}">
        <img class="btn-icon" src="../assets/icons/dropdown-handle.svg" title="Open dropdown"/>
      </button>
    </div>
    <div class="btn-group-dropdown" v-if="isShown">
      <slot name="dropdown-buttons" />
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Multibutton extends Vue {

    private isShown = false;
    private clickOutsideListener = () => this.hide();
    private clickInsideListener = (evt: Event) => evt.stopPropagation();

    constructor() {
      super();
    }

    public mounted() {
      document.body.addEventListener('click', this.clickOutsideListener);
      this.$el.addEventListener('click', this.clickInsideListener);
    }

    public beforeDestroy() {
      document.body.removeEventListener('click', this.clickOutsideListener);
      this.$el.removeEventListener('click', this.clickInsideListener);
    }

    public toggle() {
      this.isShown = !this.isShown;
    }

    public hide() {
      this.isShown = false;
    }

  }
</script>

<style scoped lang="less">
@import (reference) '../theme/theme';

  .btn-group {
    position: relative;

    display: flex;
    flex-direction: row;

    &.dropdown-open {

      &,
      > .btn-group-prepend,
      > .btn-group-append {

        > button,
        > .link-btn {

          &,
          &:before {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }


    }

    > button,
    > .link-btn {

      &:not(:first-child) {

        &,
        &:before {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        &:before {
          left: 0;
        }
      }

      &:not(:last-child) {

        &,
        &:before {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        &:before {
          right: 0;
        }
      }
    }

    > .btn-group-prepend,
    > .btn-group-append {
      display: flex;
      flex-direction: row;

      .link-btn,
      button {

        &:after {
          content: "";

          position: absolute;
          top: (@g/2);
          bottom: (@g/2);

          border-left: solid @borderColor 1px;
        }

        .btn-icon {
          margin: 0;
        }
      }
    }

    > .btn-group-prepend {

      .link-btn,
      button {
        background: @primaryColor;

        &,
        &:before {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        &:before,
        &:after {
          right: 0;
        }
      }
    }

    > .btn-group-append {

      .link-btn,
      button {
        background: @secondaryColor;

        &,
        &:before {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        &:before,
        &:after {
          left: 0;
        }
      }
    }
  }

.btn-group-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  > .link-btn,
  > button {

    &,
    &:before {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &:before {
      top: 0;
    }

    &:not(:last-child) {

      &,
      &:before {
        border-radius: 0;
      }

      &:before {
        bottom: 0;
      }
    }

    &:last-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
}

</style>
