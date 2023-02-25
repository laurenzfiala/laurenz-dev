<template>
<div class="darts-root">

  <div v-if="flow === 'gameselect'">
    <darts-game-select v-on:new="newGame($event); flow = 'playerselect'"
                       v-on:joined="flow = 'game'"></darts-game-select>
  </div>

  <div v-if="flow === 'playerselect'">
    <darts-player-select v-on:previous="flow = 'gameselect'"
                         v-on:next="setPlayers($event); flow = 'startgame'; startGame()"></darts-player-select>
  </div>

  <div v-if="flow === 'startgame'">
    <div class="startgame-load">
      <div v-if="gameCreationState.value === GameCreationState.SERVER">
        <i class="i i-xl i-load i-spin mb-2"></i>
        <div>Connecting to server...</div>
      </div>
      <div v-else-if="gameCreationState.value === GameCreationState.SERVER_INACCESSIBLE">
        Server can't be reached.
        <div class="mt-2">
          <button class="btn-link mr-1" v-on:click="startGame()">Retry</button>
          <button class="btn-link" v-on:click="$dartService.config.doServerComms = false; flow = 'game'">Create client-only game</button>
        </div>
      </div>
      <div v-else>
        <i class="i i-xl i-load i-spin mb-2"></i>
        <div>Creating game...</div>
      </div>
    </div>
  </div>

  <div v-if="flow === 'game'">
    <darts-game v-on:previous="flow = 'playerselect'"
                v-on:end="flow = 'gameselect'"></darts-game>
  </div>

  <notifications></notifications>

</div>
</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";
@import "../assets/theme/_darts";

.startgame-load {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: var(--bg-color);
}

</style>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import {DartsGame} from '~/entities/darts-game.entity';
import {PropWrapper} from '~/entities/prop-wrapper.entity';

@Component
export default class Darts extends Vue {

  GameCreationState = GameCreationState;

  flow: 'gameselect' | 'playerselect' | 'startgame' | 'game' | 'gameover' = 'gameselect';

  game!: DartsGame;
  gameCreationState: PropWrapper<GameCreationState> = new PropWrapper<GameCreationState>();

  newGame(game: DartsGame): void {
    this.game = game;
  }

  setPlayers(playerNames: string[]): void {
    this.$dartService.config.playerNames = playerNames;
    this.game.setPlayerNames(playerNames);
  }

  startGame(): void {
    if (this.$dartService.config.doServerComms) {
      this.gameCreationState.value = GameCreationState.SERVER;
    } else {
      this.gameCreationState.value = GameCreationState.CLIENT;
    }
    this.$dartService.startUsingConfig().then(() => {
      this.flow = 'game';
    }).catch(reason => {
      this.$dartService.game = this.game;
      this.gameCreationState.value = GameCreationState.SERVER_INACCESSIBLE;
      console.error(reason);
    });
  }

  created(): void {
  }

  mounted(): void {
  }

  unmounted(): void {
  }
}

export enum GameCreationState {
  SERVER,
  SERVER_INACCESSIBLE,
  CLIENT
}

</script>
