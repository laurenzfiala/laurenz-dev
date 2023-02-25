<template>

  <div class="wrapper">

    <div class="notification-wrapper">
      <Notification v-for="(n, i) in notifications"
                    v-bind:key="i"
                    v-bind:notification="n"
                    v-on:remove="$notificationService.hide(n)"></Notification>
    </div>

    <Notification v-for="(n, i) in contentNotifications"
                  v-bind:key="i"
                  v-bind:notification="n"
                  v-on:remove="$notificationService.hide(n)"></Notification>

  </div>

</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";
@import "../assets/theme/_darts";

.notification-wrapper {
  position: fixed;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  @apply m-1;
}

</style>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import {Subscription} from 'rxjs';
import {NotificationEntity, Severity} from '~/entities/notification.entity';

@Component
export default class NotificationsComponent extends Vue {

  public onShow!: Subscription;
  public onHide!: Subscription;
  public contentNotifications: NotificationEntity[] = [];
  public notifications: NotificationEntity[] = [];

  created(): void {
  }

  mounted(): void {
    this.onShow = this.$notificationService.onShow.subscribe(list => {
      for (let n of list) {
        if (n.element) {
          const el = n.element as HTMLElement;
          this.contentNotifications.push(n);
          const ro = new ResizeObserver(entries => this.updatePosition(n, el, entries[0].contentRect));
          ro.observe(n.element);
          this.updatePosition(n, el, el.getBoundingClientRect())
        } else {
          this.notifications.push(n);
        }
      }
    });
    this.onHide = this.$notificationService.onHide.subscribe(n => {
      this.removeNotification(n);
    });
  }

  private updatePosition(n: NotificationEntity, el: HTMLElement, rect: DOMRectReadOnly): void {
    if (rect.width === 0 && rect.height === 0) {
      this.$notificationService.hide(n);
      return;
    }
    n.style = 'position: absolute; top: ' + (el.offsetTop + rect.height) + 'px; left: ' + el.offsetLeft + 'px; min-width: ' + rect.width + 'px';
  }

  public removeNotification(n: NotificationEntity): void {
    this.contentNotifications = this.contentNotifications.filter(n2 => n !== n2);
    this.notifications = this.notifications.filter(n2 => n !== n2);
  }

  unmounted(): void {
    this.onShow.unsubscribe();
    this.onHide.unsubscribe();
  }

}

</script>
