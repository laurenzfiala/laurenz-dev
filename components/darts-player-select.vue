<template>

  <div class="container">

    <h1>Players</h1>

    <div>
      <div v-for="(name, i) in playerNames"
           class="-my-1 player-container">
        <input class="player my-1"
               type="text"
               v-model="playerNames[i]"
               v-on:focus="$event.target.select()"
               v-on:focusout="updatePlayer(i)"/>
        <div class="player-remove"
             role="button"
             tabindex="0"
             v-bind:class="{'hidden': playerNames.length <= 1}"
             v-on:click="removePlayer(i)"></div>
      </div>
    </div>
    <div class="mt-2">
      <button class="add-player" v-on:click="addPlayer()">Add another player</button>
    </div>

    <div class="flow-bar">
      <button class="link-arrow back" v-on:click="previous()">Select game</button>
      <button class="link-arrow"
              v-bind:class="{'invalid': !isValid()}"
              v-on:click="next()">Start</button>
    </div>

  </div>

</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";
@import "../assets/theme/_darts";

.player-container {
  position: relative;

  &:nth-child(8n+1) input.player {
    border-color: var(--darts-color-series-1);
  }
  &:nth-child(8n+2) input.player {
    border-color: var(--darts-color-series-2);
  }
  &:nth-child(8n+3) input.player {
    border-color: var(--darts-color-series-3);
  }
  &:nth-child(8n+4) input.player {
    border-color: var(--darts-color-series-4);
  }
  &:nth-child(8n+5) input.player {
    border-color: var(--darts-color-series-5);
  }
  &:nth-child(8n+6) input.player {
    border-color: var(--darts-color-series-6);
  }
  &:nth-child(8n+7) input.player {
    border-color: var(--darts-color-series-7);
  }
  &:nth-child(8n+8) input.player {
    border-color: var(--darts-color-series-8);
  }

  .player-remove {
    position: absolute;
    right: 0;
    top: 0.25rem;

    width: @buttonMinHeight;
    height: @buttonMinHeight;

    background-image: url("../assets/icons/cross.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2em;

    cursor: pointer;

    opacity: 0.3;
    transition: opacity 0.15s;

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

input.player {
  .darts-button();
  width: 100%;
  border-left-width: @border-width;
  @apply text-lg;
}

button.add-player {
  width: 100%;
  .darts-button();
}

.flow-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  background-color: var(--bg-color);
  @apply -mx-1 p-2;

  > * {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    height: 3.5rem;
    @apply mx-1 px-4;
  }
}

.invalid {
  pointer-events: none;
  opacity: 0.5;
}

</style>

<script lang="ts">
import {Component, Ref, Vue} from 'nuxt-property-decorator';
import {NotificationEntity, Severity} from '~/entities/notification.entity';

@Component
export default class DartsPlayerSelect extends Vue {

  playerNames: string[] = [];

  created(): void {
    this.addPlayer();
  }

  addPlayer(): void {
    this.playerNames.push('Player ' + (this.playerNames.length + 1));
  }

  updatePlayer(index: number): void {
    if (this.playerNames[index].trim() === '') {
      this.removePlayer(index);
    }
  }

  removePlayer(index: number): void {
    if (this.playerNames.length > 1) {
      this.playerNames.splice(index, 1);
    }
  }

  isValid(): boolean {
    if (new Set(this.playerNames).size === this.playerNames.length) {
      this.$notificationService.hideTag('duplicatePlayerName');
      return true;
    }
    this.$notificationService.show(new NotificationEntity('duplicatePlayerName', 'Duplicate player name.', Severity.DANGER))
    return false;
  }

  previous(): void {
    this.$emit('previous');
  }

  next(): void {
    this.$emit('next', this.playerNames);
  }

  unmounted(): void {
  }
}

</script>
