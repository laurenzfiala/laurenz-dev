<template>

  <div v-if="notification"
       class="notification"
       v-bind:class="{'danger': notification.severity === Severity.DANGER, 'removing': removing}"
       v-bind:style="notification.style">
    <div class="flex flex-col justify-center flex-grow">
      <div>
        {{notification.title}}
      </div>
      <div v-if="notification.description">
        {{notification.description}}
      </div>
    </div>
    <div ref="removeBtn"
         class="remove"
         role="button"
         tabindex="0"
         v-on:click="remove()"></div>
  </div>

</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";
@import "../assets/theme/_darts";

.notification {
  display: flex;
  flex-direction: row;
  min-width: 150px;

  background-color: var(--input-bg);
  border: @border-width solid var(--border-color);
  border-radius: @border-radius;
  animation: -anim-show 350ms linear;

  @apply py-3 px-5 mt-2;

  &.danger {
    color: var(--danger-text-color);
    background-color: var(--danger-color);
    border-color: var(--danger-border-color);

    .remove {
      filter: invert();
    }
  }

  &.removing {
    opacity: 0;
    animation: -anim-hide 150ms linear;
  }

  .remove {
    width: @buttonMinHeight;
    height: @buttonMinHeight;

    background-image: url("../assets/icons/cross.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2em;

    cursor: pointer;

    opacity: 0.3;
    transition: opacity 0.15s;

    @apply -my-3 -mr-5;

    &:hover,
    &:focus {
      opacity: 1;
    }

    &.hidden {
      display: none;
    }

    @media @dark {
      filter: invert();
    }
  }
}

@keyframes -anim-show {
  0% { opacity: 0 }
  100% { opacity: 1 }
}

@keyframes -anim-hide {
  0% { opacity: 1 }
  100% { opacity: 0 }
}

</style>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'nuxt-property-decorator';
import {firstValueFrom, Subscription, timer} from 'rxjs';
import {NotificationEntity, Severity} from '~/entities/notification.entity';

@Component
export default class NotificationsComponent extends Vue {

  Severity = Severity;

  public removing: boolean = false;

  @Prop()
  public notification!: NotificationEntity;

  @Ref()
  private removeBtn!: HTMLDivElement;

  public remove(): void {
    this.removing = true;
    firstValueFrom(timer(150)).then(() => {
      this.$emit('remove');
    });
  }

}

</script>
