<template>

  <div class="container">

    <h1>Select game</h1>

    <div class="join mb-4">
      <div class="mr-4">Join ongoing game</div>
      <div class="code flex-shrink-1 flex-grow-1" ref="joinCode">
        <input v-for="i in GAME_KEY_LENGTH"
               type="text"
               maxlength="1"
               v-on:focus="$event.target.select()"
               v-on:input="onGameKeyInput(i-1, $event)"
               v-on:paste="pasteJoinKey($event)"
               v-on:keydown.delete="onGameKeyKeydown($event)"
               v-bind:class="{'invalid': joinError.value}"
               v-model="joinKey[i-1]"
               autocomplete="off" />
        <i v-if="joining" class="i i-lg i-load i-spin ml-2"></i>
      </div>
    </div>

    <div class="list">
      <div v-for="game in games"
           v-on:click="selected = game; emitNew()"
           class="link-arrow"
           role="button"
           tabindex="0">
        <div class="name">{{game.displayName}}</div>
        <div class="description">{{game.description}}</div>
      </div>
    </div>

  </div>

</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";
@import "../assets/theme/_darts";

.test {
  width: 3rem;
  height: 3rem;
  filter: invert();
  animation: -anim-test 1s infinite linear;
}

@keyframes -anim-test {
  0% {transform: rotate(0deg)}
  100% {transform: rotate(-360deg)}
}

.join {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  border: solid var(--input-bg) @border-width;
  @apply p-2;

  .code {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      width: 4.5rem;
      font-family: monospace;
      .darts-button();
      @apply text-3xl mr-1 text-center;

      &:last-child {
        @apply mr-0;
      }
    }
  }

  input {

  }
}

.list {
  @apply -m-1;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    .darts-button();
    overflow: hidden;

    @apply m-1 px-1 py-2;

    &:hover,
    &:focus {

      > .name {
        @apply mx-6;
      }
      > .description {
        opacity: 1;
      }
    }

    > .name {
      transition: margin-left 0.15s, margin-right 0.15s;

      @apply mx-4 text-lg;
    }

    > .description {
      color: var(--text-color-subtle);
      transition: opacity 0.15s;
      opacity: 0;

      overflow: hidden;

      @apply text-xs;
    }
  }
}
</style>

<script lang="ts">
import {Component, Ref, Vue} from 'nuxt-property-decorator';
import {DartsGame} from '~/entities/darts-game.entity';
import {ZeroTargetGame} from '~/entities/zero-target-darts-game.entity';
import {PropWrapper} from '~/entities/prop-wrapper.entity';
import {NotificationEntity, Severity} from '~/entities/notification.entity';
import {RandomHeadToHeadGame} from '~/entities/random-hth-darts-game.entity';

@Component
export default class DartsGameSelect extends Vue {

  GAME_KEY_LENGTH = 4;

  joinKey: Array<string> = new Array<string>(4);
  joining: boolean = false;
  joinError: PropWrapper<string | undefined> = new PropWrapper<string | undefined>();

  selected!: DartsGame;

  @Ref()
  public joinCode!: HTMLDivElement;

  games: DartsGame[] = [
    new ZeroTargetGame(301),
    new RandomHeadToHeadGame(25)
  ];

  ws!: WebSocket;

  created(): void {
  }

  mounted(): void {
  }

  emitNew(): void {
    this.$dartService.config.showKey = true;
    this.$dartService.config.doServerComms = true;
    this.$dartService.config.name = this.selected.name;
    this.$emit('new', this.selected);
  }

  emitJoined(): void {
    this.$dartService.config.doServerComms = true;
    this.$emit('joined');
  }

  onGameKeyInput(joinKeyIndex: number, event: any): void {
    console.log(event);
    const targetEl = event.target;
    if (event.inputType === 'deleteContentBackward') {
      return;
    }
    // move back when backspace
    let val = targetEl.value;
    if (!val || val.length === 0) return;
    // move forward if next el exists
    let sibling = targetEl.nextElementSibling;
    if (sibling && sibling.tagName === 'INPUT') {
      sibling.select();
    }
    if (this.joinKey.filter(c => c !== '').length === this.GAME_KEY_LENGTH) {
      this.joinGame();
    }
  }

  onGameKeyKeydown(event: any): void {
    const targetEl = event.target;
    if (event.key === 'Backspace' && targetEl.value === '' && targetEl.previousElementSibling && targetEl.previousElementSibling.tagName === 'INPUT') {
      targetEl.previousElementSibling.select();
      return;
    }
  }

  pasteJoinKey(event: any): void {
    const pasteString: string = event.clipboardData.getData('text/plain');
    if (pasteString && pasteString.length === this.GAME_KEY_LENGTH) {
      this.joinKey = pasteString.split('');
      event.preventDefault();
      this.joinGame();
    }
  }

  joinGame(): void {
    console.log("JOINING");
    this.joining = true;
    this.joinError.value = undefined;
    const key = this.joinKey.join('').toLowerCase();
    this.$dartService.get(key).then(value => {
      console.log(value);
      this.joining = false;
      this.selected = value;
      this.emitJoined();
    }).catch(reason => {
      this.joining = false;
      this.joinError.value = reason;
      console.log('joining failed: ' + reason);
      this.$notificationService.show(new NotificationEntity('joinKey', reason, Severity.DANGER, this.joinCode));
    });
  }

  unmounted(): void {
  }
}

</script>
