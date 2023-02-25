<template>

  <div class="wrapper"
       v-bind:class="'player-' + (game.value.players().indexOf(activePlayer.value)+1)">

    <div class="pull-sheet"
         ref="pullSheet"
         v-bind:class="{'closed': !pullSheetOpen}"
         v-if="isTouchDevice">
      <div class="content">
        <div class="mt-2">
          <div class="mb-2">Mode: {{game.value.name}}</div>
          <div v-if="wsReadyState.value === WebSocket.OPEN" class="text-3xl mb-2">Connected to server</div>
          <div v-if="wsReadyState.value === WebSocket.CLOSED" class="text-3xl mb-2">
            Disconnected from server
            <button class="link-arrow m-2" v-on:click="$dartService.get()">Reconnect</button>
          </div>
          <div class="flex flex-col items-center">
            <div v-if="game.value.key"
                 class="text-sm text-center">Join using code</div>
            <div v-if="game.value.key"
                 class="code pb-4">
              <span v-for="c in game.value.key">{{c}}</span>
            </div>
            <div class="d-flex flex-row -m-1 mb-0">
              <button class="link-arrow px-9 m-1" v-on:click="rematch()">Rematch</button>
              <button class="link-arrow px-9 m-1" v-on:click="endGame()">End game</button>
            </div>
          </div>
        </div>
      </div>
      <div class="pull-bar" ref="pullBar"></div>
    </div>

    <div class="player-overview" ref="playerOverview">
      <div class="flex flex-row text-xl">
        <div v-for="player in game.value.players()"
             v-bind:class="activePlayer.value === player ? 'active' : ''"
             v-on:click="activePlayer.value = player"
             role="button"
             tabindex="0"
             class="player">
          <div v-if="game.value.hasPlayerWon(player) > 0"
               class="font-bold text-6xl -mb-1">
            <template v-if="game.value.hasPlayerWon(player) === 1">1st</template>
            <template v-else-if="game.value.hasPlayerWon(player) === 2">2nd</template>
            <template v-else-if="game.value.hasPlayerWon(player) === 3">3rd</template>
            <template v-else>{{game.value.hasPlayerWon(player)}}th</template>
          </div>
          <div v-else class="font-bold text-6xl -mb-1">{{game.value.scoreFn(player)}}</div>
          <div class="-mt-2">{{player.name()}}</div>
        </div>
      </div>
    </div>

    <div class="scrollable-content">

      <div v-if="game.value.name === 'random_hth'">
        {{game.value.targetField}}
      </div>

      <div class="throw-list">
        <div v-for="(thr, i) in displayThrows()"
             v-on:click="toggleReplaceThrow(thr)"
             role="button"
             tabindex="0"
             v-bind:class="{'editing': replacingThrow.value === thr || activeThrow.value === thr}">
          Throw {{i+1}}
          <template v-if="thr.done">
            <span class="font-bold text-3xl ml-6">{{thr.toString()}}</span>
          </template>
          <div class="flex-grow"></div>
          <img src="../assets/icons/dart.svg"
               class="dart ml-8"
               style="height: 1.5em; display: inline-block" />
        </div>
      </div>

      <div v-if="game.value.hasPlayerWon(activePlayer.value) || game.value.hasEnded()"
           class="mx-4 my-8 text-center"
           ref="winContainer">
        <div class="win">
          <div class="text-3xl win-msg">
            <template v-if="game.value.hasPlayerWon(activePlayer.value) === 1">You won!</template>
            <template v-else-if="game.value.hasPlayerWon(activePlayer.value) === game.value.players().length">You lost!</template>
            <template v-else-if="game.value.hasPlayerWon(activePlayer.value) === 2">You're 2nd place!</template>
            <template v-else-if="game.value.hasPlayerWon(activePlayer.value) === 3">You're 3rd place!</template>
            <template v-else>You're {{game.value.hasPlayerWon(activePlayer.value)}}th place!</template>
          </div>
          <div v-if="game.value.playerStats(activePlayer.value).length > 0"
               class="my-2 w-52 text-left">
            <div class="font-bold mb-1">Your throws</div>
            <div v-for="text in game.value.playerStats(activePlayer.value)">{{text}}</div>
          </div>
        </div>
      </div>

    </div>


    <div class="flex-grow"></div>

    <div v-if="game.value.hasEnded()"
         class="game-end-bar">
      <button v-on:touchstart.prevent="$emit('previous');"
              class="link-arrow back">
        Player select
      </button>
      <button v-if="game.value.hasEnded()"
              v-on:touchstart.prevent="startGame(true)"
              class="link-arrow">
        Rematch
      </button>
    </div>

    <button v-else-if="activePlayer.value === game.value.activePlayer() && !game.value.hasNextThrow(activePlayer.value)"
            v-on:click="nextPlayer()"
            class="next link-arrow m-2">
      Next {{game.value.isRoundEnd() ? 'round' : 'player'}}
    </button>

    <div v-if="activeThrow.value && (game.value.activePlayer() === activePlayer.value || replacingThrow.value) && !isTouchDevice">
      <input style="width: 100%; height: 4rem"
             type="text"
             placeholder="Enter throw to submit"
             v-on:keypress.enter="activeThrow.value.fromString($event.target.value.toUpperCase()) ? null : $event.target.value = ''; updateThrow(); $event.target.select()" />
    </div>

    <div v-if="activeThrow.value && (game.value.activePlayer() === activePlayer.value || replacingThrow.value) && isTouchDevice"
         class="throw-touch-input">

      <div class="tabs">
        <button v-on:touchstart.prevent="toggleModifier('D'); swapActivatedClass($event);"
                v-bind:class="activeThrow.value.modifier === 'D' ? 'active' : ''">
          D
        </button>
        <button v-on:touchstart.prevent="toggleModifier('T'); swapActivatedClass($event);"
                v-bind:class="activeThrow.value.modifier === 'T' ? 'active' : ''">
          T
        </button>
      </div>
      <div class="table text-lg">
        <div v-for="r in throwInputRows">
          <button v-for="c in throwInputCols"
                  v-on:touchstart.prevent="setField(20 - r*throwInputCols + c); swapActivatedClass($event);">
            {{20 - r*throwInputCols + c}}
          </button>
        </div>
        <div>
          <button v-on:touchstart.prevent="activeThrow.value.field = 'BULL'; updateThrow(); swapActivatedClass($event);">
            BULL
          </button>
          <button v-on:touchstart.prevent="activeThrow.value.field = 'MISS'; updateThrow(); swapActivatedClass($event);">
            MISS
          </button>
        </div>
      </div>

    </div>

  </div>

</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";
@import "../assets/theme/_darts";

.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media @touch {
    padding-top: 1.5rem;
  }

  &.player-1 .win-msg {
    border-bottom-color: var(--darts-color-series-1);
  }
  &.player-2 .win-msg {
    border-bottom-color: var(--darts-color-series-2);
  }
  &.player-3 .win-msg {
    border-bottom-color: var(--darts-color-series-3);
  }
  &.player-4 .win-msg {
    border-bottom-color: var(--darts-color-series-4);
  }
  &.player-5 .win-msg {
    border-bottom-color: var(--darts-color-series-5);
  }
  &.player-6 .win-msg {
    border-bottom-color: var(--darts-color-series-6);
  }
  &.player-7 .win-msg {
    border-bottom-color: var(--darts-color-series-7);
  }
  &.player-8 .win-msg {
    border-bottom-color: var(--darts-color-series-8);
  }
}

.player {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: var(--input-bg);
  white-space: nowrap;
  min-width: 45vw;

  &:nth-child(8n+1) {
    background-color: var(--darts-color-series-1);
    &.active:after {
      border-top-color: var(--darts-color-series-1);
    }
  }
  &:nth-child(8n+2) {
    background-color: var(--darts-color-series-2);
    &.active:after {
      border-top-color: var(--darts-color-series-2);
    }
  }
  &:nth-child(8n+3) {
    background-color: var(--darts-color-series-3);
    &.active:after {
      border-top-color: var(--darts-color-series-3);
    }
  }
  &:nth-child(8n+4) {
    background-color: var(--darts-color-series-4);
    &.active:after {
      border-top-color: var(--darts-color-series-4);
    }
  }
  &:nth-child(8n+5) {
    background-color: var(--darts-color-series-5);
    &.active:after {
      border-top-color: var(--darts-color-series-5);
    }
  }
  &:nth-child(8n+6) {
    background-color: var(--darts-color-series-6);
    &.active:after {
      border-top-color: var(--darts-color-series-6);
    }
  }
  &:nth-child(8n+7) {
    background-color: var(--darts-color-series-7);
    &.active:after {
      border-top-color: var(--darts-color-series-7);
    }
  }
  &:nth-child(8n+8) {
    background-color: var(--darts-color-series-8);
    &.active:after {
      border-top-color: var(--darts-color-series-8);
    }
  }

  > div {
    @apply p-2;
  }

  &.active {
    position: relative;

    &:after {
      top: 100%;
      left: 50%;
      content: "";
      border: solid transparent;
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-width: 1rem;
      margin-left: -1rem;
    }
  }
}

.player-overview {
  flex-shrink: 0;
  position: sticky;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  @apply pb-4;
}

.scrollable-content {
  min-height: 0;
  overflow: auto;
  @apply -mt-4;
}

.throw-list {

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: solid var(--border-color) 1px;
    .darts-game-button();

    @apply p-4;

    .dart {
      opacity: 0.5;
      transition: transform 0.15s, opacity 0.15s;

      @media @dark {
        filter: invert();
      }
    }

    &.editing {
      background-color: var(--input-bg);

      .dart {
        transform: translateX(-2em);
        opacity: 1;
      }
    }
  }
}

.win {
  background-color: var(--input-bg);
  @apply inline-block p-4;

  .win-msg {
    border-bottom: solid @border-width var(--secondary-color);
  }
}

.next.link-arrow {
  .darts-game-button();
}

.throw-touch-input {

  button {
    .darts-game-button();

    &.activated {
      animation: -anim-button-clicked 0.25s;
    }

    &.activated2 {
      animation: -anim-button-clicked2 0.25s;
    }
  }

  > div {
    display: flex;
    flex-direction: row;

    &.tabs {

      > button {

        &.active {
          color: var(--text-color);
          background-color: var(--secondary-color);
          font-weight: bold;
        }
      }
    }

    > button {
      flex-shrink: 0;
      flex-basis: 0;
      flex-grow: 1;
      box-shadow: 0 -@border-width 0 var(--secondary-color) inset;
      @apply p-2 text-lg;
    }
  }

  .table {
    display: flex;
    flex-direction: column;
    //box-shadow: inset 0 0 0 0.25rem #34d399;

    > * {
      display: flex;
      flex-direction: row;

      > * {
        flex-basis: 0;
        flex-shrink: 0;
        flex-grow: 1;
      }
    }
  }
}

.game-end-bar {
  display: flex;
  flex-direction: row;
  @apply m-1;

  > button {
    flex-basis: 0;
    flex-grow: 1;

    .darts-game-button();
    @apply text-lg m-1;
  }
}

.pull-sheet {
  position: fixed;
  top: -9999px;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: var(--bg-color);
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  outline: 1px solid var(--border-color);
  transition: top 100ms ease-out, outline-color 350ms linear;

  &.closed {
    outline-color: var(--border-color-transparent);
  }

  .content {
    overflow: hidden;

    @apply mx-2;
  }

  .code {
    display: flex;
    flex-direction: row;
    @apply -m-1;

    > * {
      background-color: var(--input-bg);
      min-width: 2.5rem;
      text-align: center;
      font-family: monospace;
      @apply p-1 m-1 text-lg;
    }
  }
}

.pull-bar {
  height: 0.4rem;
  width: 50%;
  border-radius: 0.2rem;
  background-color: var(--border-color);

  @apply my-2 mx-auto;
}

@keyframes -anim-throw-done {
  0% {background-color: transparent}
  0% {background-color: var(--primary-color)}
}

@keyframes -anim-throw-done2 {
  0% {background-color: transparent}
  0% {background-color: var(--primary-color)}
}

@keyframes -anim-button-clicked {
  0% {background-color: transparent}
  0% {background-color: var(--secondary-color)}
}

@keyframes -anim-button-clicked2 {
  0% {background-color: transparent}
  0% {background-color: var(--secondary-color)}
}
</style>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'nuxt-property-decorator';
import {Touch} from '~/utils/Touch';
import {DartsGame} from '~/entities/darts-game.entity';
import {DartThrow} from '~/entities/dart-throw.entity';
import {DartsPlayer} from '~/entities/darts-player.entity';
import {PropWrapper} from '~/entities/prop-wrapper.entity';
import {NotificationEntity} from '~/entities/notification.entity';
import {Subscription} from 'rxjs';

@Component
export default class DartsGameComponent extends Vue {

  WebSocket = WebSocket;

  throwInputRows: number = 5;
  throwInputCols: number = Math.ceil(20/this.throwInputRows);
  isTouchDevice: boolean = Touch.isTouchDevice();

  public game: PropWrapper<DartsGame> = new PropWrapper<DartsGame>();
  public replacingThrow: PropWrapper<DartThrow | undefined> = new PropWrapper<DartThrow | undefined>();
  public activeThrow: PropWrapper<DartThrow | undefined> = new PropWrapper<DartThrow | undefined>();
  public activePlayer: PropWrapper<DartsPlayer> = new PropWrapper<DartsPlayer>();
  public wsReadyState: PropWrapper<number | undefined> = new PropWrapper<number | undefined>();

  @Ref()
  public pullSheet: any;

  @Ref()
  public pullBar: any;

  @Ref()
  public playerOverview: any;

  @Ref()
  public winContainer: any;

  private pullSheetLastScreenY: number = 0;
  private pullSheetLastDeltaY: number = 0;
  private pullSheetOpen: boolean = false;

  private gameChangeSub: Subscription | undefined;
  private gameEndSub: Subscription | undefined;
  private wsStateChangeSub: Subscription | undefined;

  created(): void {
    this.startGame();
  }

  mounted(): void {
    if (this.isTouchDevice) {
      this.pullSheet.style.top = (-this.pullSheet.offsetHeight + this.remToPixels(1.4)) + 'px';
      this.pullSheet.addEventListener('touchstart', (ev: TouchEvent) => {
        this.pullSheetLastScreenY = ev.touches[0].screenY;
      });
      this.pullSheet.addEventListener('touchmove', (ev: TouchEvent) => {
        this.dragPullSheet(ev.touches[0].screenY);
        this.pullSheetOpen = true;
      });
      this.pullSheet.addEventListener('touchend', (ev: TouchEvent) => {
        if (this.pullSheetLastDeltaY > 0) {
          this.dragPullSheet(9999);
        } else if (this.pullSheetLastDeltaY < 0) {
          this.dragPullSheet(0);
          this.pullSheetOpen = false;
        }
      });
    }
  }

  private dragPullSheet(screenY: number): void {
    screenY = Math.min(screenY, this.pullSheet.offsetHeight + this.remToPixels(1.4));
    screenY = Math.max(screenY, this.remToPixels(2.8))
    let target = -this.pullSheet.offsetHeight - this.remToPixels(1.4) + screenY;
    this.pullSheet.style.top = target + 'px';
    let delta = screenY - this.pullSheetLastScreenY;
    if (Math.abs(delta) > 5) {
      this.pullSheetLastDeltaY = delta;
    }
    this.pullSheetLastScreenY = screenY;
  }

  unmounted(): void {
    this.gameChangeSub?.unsubscribe();
    this.gameEndSub?.unsubscribe();
    this.wsStateChangeSub?.unsubscribe();
  }

  startGame(rematch: boolean = false): void {
    if (this.$dartService.config.doServerComms) {
      this.$dartService.component = this;
      this.gameChangeSub = this.$dartService.onChange.subscribe(game => {
        this.game.value = game;
        this.activeThrow.value = this.game.value.nextThrow();
        this.activePlayer.value = this.game.value.activePlayer();
      });
      this.gameEndSub = this.$dartService.onEnd.subscribe(game => {
        if (game) {
          this.$dartService.game = game;
          this.game.value = game;
          this.$notificationService.show(new NotificationEntity('game_end', 'Rematch started'))
        } else {
          this.$emit('end');
          this.$notificationService.show(new NotificationEntity('game_end', 'Game ended'))
        }
      });
      this.wsStateChangeSub = this.$dartService.onWsStateChanged.subscribe(newState => {
        this.wsReadyState.value = newState;
        this.dragPullSheet(9999);
        this.pullSheetOpen = true;
      });
    } else {
      this.game.value =  this.$dartService.game;
      this.activeThrow.value = this.game.value.nextThrow();
      this.activePlayer.value = this.game.value.activePlayer();
    }
    if (this.playerOverview) {
      this.playerOverview.scrollLeft = 0;
    }
  }

  toggleModifier(modifier: undefined | 'D' | 'T'): void {
    if (this.activeThrow) (this.activeThrow.value as DartThrow).toggleModifier(modifier);
    this.updateThrow();
  }

  setField(field: undefined | number | 'BULL' | 'MISS'): void {
    if (this.activeThrow) (this.activeThrow.value as DartThrow).field = field;
    this.updateThrow();
  }

  swapActivatedClass(event: any): void {
    let classList = event.target.classList;
    if (classList.contains('activated')) {
      classList.remove('activated');
      classList.add('activated2');
    } else if (classList.contains('activated2')) {
      classList.remove('activated2');
      classList.add('activated');
    } else {
      classList.add('activated');
    }
  }

  updateThrow(): void {
    if (this.activeThrow.value?.done) {
      //this.lastThrow = this.activeThrow;
      const thr = this.activeThrow.value;
      this.activeThrow.value = this.game.value.nextThrow(this.replacingThrow.value, thr);
      this.$dartService.thr(thr as DartThrow);
      this.replacingThrow.value = undefined;
    }
  }

  toggleReplaceThrow(toBeReplaced: DartThrow): void {
    if (this.replacingThrow.value === toBeReplaced) {
      this.replacingThrow.value = undefined;
      this.activeThrow.value = this.game.value.nextThrow();
    } else if (toBeReplaced.done) {
      this.replacingThrow.value = toBeReplaced;
      this.activeThrow.value = new DartThrow(this.activePlayer.value.name());
      this.activeThrow.value.id = toBeReplaced.id;
    }
  }

  rematch(): void {
    this.$dartService.end(true);
    this.dragPullSheet(0);
    this.pullSheetOpen = false;
  }

  endGame(): void {
    this.$dartService.end();
    this.$emit('end');
  }

  displayThrows(): DartThrow[] {
    let thrs = this.activePlayer.value.displayThrows().slice();
    if (this.activeThrow.value !== undefined && this.replacingThrow.value === undefined && this.activePlayer.value === this.game.value.activePlayer()) {
      thrs.push(this.activeThrow.value as DartThrow);
    }
    return thrs;
  }

  nextPlayer(): void {
    this.activePlayer.value = this.game.value.nextPlayer();
    this.activeThrow.value = this.game.value.nextThrow();
    this.playerOverview.scrollLeft = (this.playerOverview.scrollWidth / this.game.value.players().length) *
      this.game.value.players().indexOf(this.activePlayer.value);
  }

  remToPixels(rem: number) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
}

</script>
