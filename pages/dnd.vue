<template>
<div class="container">
  <div class="float-left"></div>
  <h1>
    <NuxtLink to="/" class="plain nav-back"></NuxtLink>
    D&amp;D pad+
  </h1>
  <form>
    <div class="flex flex-row flex-wrap-reverse justify-end -m-1">
      <input type="text" class="search flex-grow flex-shrink m-1"/>
      <div class="toolbar flex flex-row my-1">
        <button class="mx-1 flex-basis-0" title="Use a local file">
          <img src="../assets/icons/upload.svg" alt="Arrow pointing away from storage drive"/>
        </button>
        <button class="mx-1 flex-basis-0" title="Download current state">
          <img src="../assets/icons/download.svg" alt="Arrow pointing towards storage drive"/>
        </button>
        <button class="mx-1 flex-basis-0" title="Show application settings">
          <img src="../assets/icons/cog.svg" alt="Cog"/>
        </button>
      </div>
    </div>

    <!-- PAD -->
    <section class="pads">
      <div v-for="(pad, index) in dndStore.pads.model"
           class="pad"
           v-bind:class="pad.active ? 'active' : ''">
        <div class="pad-title"
             v-on:click="activatePad(index)">
          {{pad.name}}
          <div class="separator"></div>
          <div v-if="index <= 9" class="key-hint ml-2">{{(index + 1) % 10}}</div>
        </div>
        <div class="flex flex-row items-center -m-1">
          <template v-if="pad.model.length > 0">
            <template v-for="(val, i) in pad.model">
              <button v-on:click.prevent="">
                <div class="text-sm opacity-50">{{val.name}}</div>
                <div class="text-xl">{{resolve(val.value)}}</div>
              </button>
              <div>{{i === pad.model.length-1 ? '=' : '+'}}</div>
            </template>
            <button v-on:click.prevent="">
              <div class="text-sm opacity-50">Result</div>
              <div class="text-xl">{{pad.model.map(v => v.value).reduce((a, b) => a + b)}}</div>
            </button>
          </template>
          <template v-if="pad.model.length === 0"
                    v-for="val in 5">
            <button v-on:click.prevent="">
              <div class="text-sm opacity-50">&nbsp;</div>
              <div class="text-xl">&nbsp;</div>
            </button>
            <div>{{val === 5 ? '=' : '+'}}</div>
          </template>
        </div>
      </div>
      <!-- add new pad -->
      <div class="pad">
        <div class="pad-title">
          <input class="add-pad"
                 type="text"
                 placeholder="New pad name"
                 v-on:keydown.enter.prevent=""
                 v-on:keyup.enter.prevent="addPad($event.target.value); activatePad(dndStore.pads.model.length-1)" />
          <div class="separator"></div>
          <div class="key-hint ml-2">↵</div>
        </div>
      </div>
    </section>

    <!-- DICE -->
    <section>
      <h2 v-on:click="toggleSectionCollapse('dice')">
        <div>
          <div v-bind:class="dndStore.ui.sections.dice.collapsed ? 'closed-handle' : 'open-handle'"></div>
          Dice
        </div>
        <div class="drag-handle"></div>
      </h2>

      <div v-if="dndStore.ui.sections.dice.collapsed"
           class="flex flex-row flex-wrap -m-1">
        <button v-for="die in dice"
                class="die select-none m-1 mb-8"
                v-bind:class="die.class"
                v-dnd-value:click="{action: padVal, value: {name: 'd' + die.sides, value: die.value + '[0]'}}"
                v-on:click.prevent="rollDie(die)">
          <span class="value">{{die.sides}}</span>
          <div class="roll"
               v-if="resolve(die.value).length >= 1">
            {{resolve(die.value)[0]}}
          </div>
          <div class="prev-roll"
               v-if="resolve(die.value).length >= 2">
            {{resolve(die.value)[1]}}
          </div>
          <div class="prev-prev-roll"
               v-if="resolve(die.value).length >= 3">
            {{resolve(die.value)[2]}}
          </div>
        </button>
      </div>
      <!--<div class="prev-rolls flex flex-row -mx-1 mt-2 truncate"
           v-if="dice.previousRolls.length > 0">
        <span class="arrow mx-1 flex-shrink-0 opacity-50" title="Previous rolls">→</span>
        <span class="mx-1 flex-shrink-0 prev-roll"
              v-for="roll in dice.previousRolls.slice(-10).reverse()">
          <span class="badge text-white">D{{roll.sides}}</span>
          <span class="mx-1 text-gray-400">{{roll.rollVal}}</span>
        </span>
      </div>-->
    </section>

    <!-- SKILLS -->
    <section>
      <h2 v-on:click="toggleSectionCollapse('skills')">
        <div>
          <div v-bind:class="dndStore.ui.sections.skills.collapsed ? 'closed-handle' : 'open-handle'"></div>
          Skills
        </div>
        <div class="drag-handle"></div>
      </h2>

      <div v-if="dndStore.ui.sections.skills.collapsed"
           class="flex flex-row flex-wrap align-items-stretch align-content-stretch -m-2">
        <div v-for="skill in skills"
             class="skill">
          <div class="main">
            <input type="text" class="value w-16 inline-block text-center" v-bind:value="resolve(skill.value.value)" />
            <div>{{skill.value.name}}</div>
          </div>
          <div class="mt-8">
            <div v-for="subskill in skill.subskills"
                 class="sub">
              <input type="text" class="value inline-block w-8 text-center" v-bind:value="resolve(subskill.value)" />
              {{subskill.name}}
            </div>
          </div>
        </div>
        <div class="skill no-heading flex flex-row flex-wrap  align-items-stretch align-content-stretch">
          <div class="sub flex-basis-0 flex-grow">
            <input type="text" class="value inline-block w-8 text-center" value="0" />
            Passive Perception
          </div>
          <div class="sub flex-basis-0 flex-grow">
            <input type="text" class="value inline-block w-8 text-center" value="0" />
            Passive Insight
          </div>
          <div class="sub flex-basis-0 flex-grow">
            <input type="text" class="value inline-block w-8 text-center" value="0" />
            Passive Stealth
          </div>
          <div class="sub flex-basis-0 flex-grow">
            <input type="text" class="value inline-block w-8 text-center" value="0" />
            Proficiency Bonus
          </div>
          <div class="sub flex-basis-0 flex-grow">
            <input type="text" class="value inline-block w-8 text-center" value="0" />
            Inspiration
          </div>
          <div class="sub flex-basis-0 flex-grow">
            <input type="text" class="value inline-block w-8 text-center" value="0" />
            Exhaustion Level
          </div>
        </div>
      </div>
    </section>
  </form>
</div>
</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";

section {
  @apply mt-6 mb-2;

  > h2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    user-select: none;
    font-weight: bold;
    background-color: var(--dnd-section-bg);
    box-shadow: inset 0 -@border-width @border-width var(--dnd-section-bg);
    color: var(--primary-color-dark);
    cursor: pointer;
    @apply pt-2 pb-1 px-2;

    .open-handle, .closed-handle {
      display: inline-block;
      width: 1em;
      height: 1em;
      @apply mr-2 ml-1;

      background-image: url("../assets/icons/chevron_left.svg");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.5;
      transform: translateY(0.1em);
    }

    .closed-handle {
      transform: rotate(-90deg);
    }

    .open-handle {
      transform: rotate(-180deg);
    }

    .drag-handle {
      display: inline-block;
      width: 1em;
      height: 1em;
      @apply ml-4 mr-1;

      background-image: url("../assets/icons/drag_handle.svg");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.5;
      transform: translateY(0.1em);

      &:hover,
      &:focus {
        opacity: 1;
      }
    }
  }
}

section.pads {
  @apply mt-2;

  .pad {

    &.active {
      .pad-title {
        color: var(--primary-color-dark);
        font-weight: bold;

        .separator {
          border-color: var(--primary-color);
        }
      }
    }

    &:not(.active) {
      .pad-title {
        cursor: pointer;
      }
    }

    .pad-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      color: var(--text-color-subtle);
      @apply text-sm;

      .separator {
        content: "";

        height: 1px;
        flex-grow: 1;
        border-bottom: dashed var(--input-bg) @border-width;
        @apply ml-2;
      }
    }

    button {
      min-width: 4rem;
      @apply m-1 py-1 px-2 text-center;
    }
  }

  .add-pad {
    display: inline-block;
    @apply m-0 mt-2 text-sm;
  }
}

.search {
  min-width: 100px;
}

.toolbar {

  button > img {
    width: 1.5rem;
    height: 1.5rem;

    @media @dark {
      filter: invert();
    }
  }
}

.die {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 4rem;
  background-color: var(--input-bg);
  font-weight: bold;

  > .value {

    &::before {
      content: "d";
      display: inline-block;
      opacity: @opacity-subtle;
      font-weight: normal;
    }
  }

  > .roll {
    color: var(--secondary-color-dark);
    @apply text-xl;
  }

  > .prev-roll, > .prev-prev-roll {
    position: absolute;
    bottom: -2em;

    opacity: 0.5;
    @apply text-sm;
  }

  > .prev-prev-roll {
    bottom: -4em;

    opacity: 0;
  }

  &.changed {
    animation: 0.5s btn-change-bg cubic-bezier(0.22, 1, 0.36, 1);

    .roll {
      animation: 1s btn-change-text cubic-bezier(0.22, 1, 0.36, 1);
    }

    > .prev-roll {
      animation: ease-out die-prev-roll 0.25s;
    }

    > .prev-prev-roll {
      animation: ease-in die-prev-prev-roll 0.25s;
    }
  }

  &.changed2 {
    animation: 0.5s btn-change-bg2 cubic-bezier(0.22, 1, 0.36, 1);

    .roll {
      animation: 1s btn-change-text2 cubic-bezier(0.22, 1, 0.36, 1);
    }

    > .prev-roll {
      animation: ease-out die-prev-roll2 0.25s forwards;
    }

    > .prev-prev-roll {
      animation: ease-in die-prev-prev-roll2 0.25s forwards;
    }
  }

}

.prev-rolls {

  .arrow {
    transform: translateY(0.125em);
  }

  .prev-roll {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: solid var(--secondary-color-light) @border-width;
  }
}

@keyframes btn-change-bg {
  0% {background-color: var(--secondary-color-light)}
  100% {background-color: var(--input-bg)}
}
@keyframes btn-change-bg2 {
  0% {background-color: var(--secondary-color-light)}
  100% {background-color: var(--input-bg)}
}
@keyframes btn-change-text {
  0% {color: var(--primary-color-dark)}
  100% {color: var(--secondary-color-dark)}
}
@keyframes btn-change-text2 {
  0% {color: var(--primary-color-dark)}
  100% {color: var(--secondary-color-dark)}
}
@keyframes die-prev-roll {
  0% {transform: translateY(-2em);}
  100% {transform: translateY(0);}
}
@keyframes die-prev-roll2 {
  0% {transform: translateY(-2em);}
  100% {transform: translateY(0);}
}
@keyframes die-prev-prev-roll {
  0% {transform: translateY(-2em); opacity: 1;}
  100% {transform: translateY(0); opacity: 0;}
}
@keyframes die-prev-prev-roll2 {
  0% {transform: translateY(-2em); opacity: 1;}
  100% {transform: translateY(0); opacity: 0;}
}

.skill {
  position: relative;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 170px;

  //border: solid var(--input-bg) @border-width;
  box-shadow: inset 0 0 0 @border-width var(--input-bg);
  @apply p-2 m-2 mt-10 text-xs;

  .main {
    position: absolute;
    top: 0;
    left: 50%;

    transform: translate(-50%, -50%);
    background-color: var(--bg-color);
    text-align: center;

    @apply py-1 px-2 text-base;

    .value {
      @apply text-2xl;
    }
  }

  .sub:first-child {
    @apply mb-1;
  }

  &.no-heading {
    @apply mt-2 text-sm;

    .sub {
      flex-basis: 0;
      flex-grow: 1;

      &:first-child {
        @apply mb-0;
      }
    }
  }

  &.full {
    min-width: calc(100% - 1rem);
    @apply mt-2;
  }
}

</style>

<script lang="ts">
import {Vue, Component, namespace} from 'nuxt-property-decorator';
import {DiceRoll} from '~/entities/DiceRoll';
import {DndValue} from '~/entities/DndValue';
const DndStore = namespace("modules/dnd");

@Component
export default class Dnd extends Vue {

  @DndStore.Getter("dnd") dndStore: any;
  @DndStore.Mutation("updateDie") updateDie!: (payload: any) => void;
  @DndStore.Mutation("addPad") addPad!: (name: string) => number;
  @DndStore.Mutation("addPadValue") addPadValue!: (payload: DndValue) => void;
  @DndStore.Mutation("toggleSectionCollapse") toggleSectionCollapse!: (sectionName: string) => void;
  @DndStore.Mutation("activatePad") activatePad!: (index: number) => void;
  @DndStore.Mutation("deactivatePad") deactivatePad!: (index: number) => void;

  public isAddPadVar: boolean = false;

  public dice = [
    {sides: 20, value: 'dice.rollHistoryPerDie.d20'},
    {sides: 4, value: 'dice.rollHistoryPerDie.d4'},
    {sides: 6, value: 'dice.rollHistoryPerDie.d6'},
    {sides: 8, value: 'dice.rollHistoryPerDie.d8'},
    {sides: 10, value: 'dice.rollHistoryPerDie.d10'},
    {sides: 12, value: 'dice.rollHistoryPerDie.d12'},
    {sides: 100, value: 'dice.rollHistoryPerDie.d100'}
  ];

  public skills: any = [
    {
      value: {name: 'Strength', value: 'skills.str.value'},
      subskills: [
        {name: 'Saving Throw', value: 'skills.str.subskills.sav'},
        {name: 'Athletics', value: 'skills.str.subskills.ath'}
      ]
    },
    {
      value: {name: 'Dexterity', value: 'skills.dex.value'},
      subskills: [
        {name: 'Saving Throw', value: 'skills.dex.subskills.sav'},
        {name: 'Acrobatics', value: 'skills.dex.subskills.acr'},
        {name: 'Sleight of Hand', value: 'skills.dex.subskills.sle'},
        {name: 'Stealth', value: 'skills.dex.subskills.ste'}
      ]
    },
    {
      value: {name: 'Constitution', value: 'skills.con.value'},
      subskills: [
        {name: 'Saving Throw', value: 0},
      ]
    },
    {
      value: {name: 'Intelligence', value: 'skills.int.value'},
      subskills: [
        {name: 'Saving Throw', value: 0},
        {name: 'Arcana', value: 0},
        {name: 'History', value: 0},
        {name: 'Investigation', value: 0},
        {name: 'Nature', value: 0},
        {name: 'Religion', value: 0}
      ]
    },
    {
      value: {name: 'Wisdom', value: 'skills.wis.value'},
      subskills: [
        {name: 'Saving Throw', value: 'skills.wis.subskills.sav'},
        {name: 'Animal Handling', value: 'skills.wis.subskills.ani'},
        {name: 'Insight', value: 'skills.wis.subskills.ins'},
        {name: 'Medicine', value: 'skills.wis.subskills.med'},
        {name: 'Perception', value: 'skills.wis.subskills.per'},
        {name: 'Survival', value: 'skills.wis.subskills.sur'}
      ]
    },
    {
      value: {name: 'Charisma', value: 'skills.cha.value'},
      subskills: [
        {name: 'Saving Throw', value: 'skills.cha.subskills.sav'},
        {name: 'Deception', value: 'skills.cha.subskills.dec'},
        {name: 'Intimidation', value: 'skills.cha.subskills.int'},
        {name: 'Performance', value: 'skills.cha.subskills.perf'},
        {name: 'Persuasion', value: 'skills.cha.subskills.pers'}
      ]
    }
  ];

  public rollDie(die: any): void {
    const sides = die.sides;
    const rollVal = Math.floor(Math.random() * sides + 1);
    const roll = new DiceRoll(sides, rollVal);

    if (die.class === 'changed') {
      die.class = 'changed2';
    } else {
      die.class = 'changed';
    }

    this.updateDie({die: die, roll: roll});
  }

  public resolve(value: string | number): any {
    if (value === undefined) {
      return undefined;
    } else if (typeof value === 'string') {
      return this.resolve2(this.dndStore, value);
    }
    return value;
  }

  public resolve2(resolveRoot: any, stringVal: string): any {
    let resolvedVal = resolveRoot;
    for (let pathPart of stringVal.split('.')) {
      for (let pathPart2 of pathPart.split(/[\[\]]/g)) {
        if (pathPart2 === '') continue;
        resolvedVal = resolvedVal[pathPart2];
      }
    }
    return this.resolve(resolvedVal);
  }

  public padVal(value: DndValue) {
    var saveVal = Object.assign({}, value);
    saveVal.value = this.resolve(saveVal.value);
    this.addPadValue(saveVal);
  }

  private keydownEventListener(ev: KeyboardEvent): void {
    if (ev.target !== document.body) return;
    let numKeyValue = parseInt(ev.key);
    if (isNaN(numKeyValue)) return;
    let padIndex = numKeyValue === 0 ? 9 : numKeyValue - 1;
    if (this.dndStore.pads.model.length <= padIndex) return;
    if (this.dndStore.pads.model[padIndex].active) {
      this.deactivatePad(padIndex);
    } else {
      this.activatePad(padIndex);
    }
  }

  created(): void {
    //console.log(this.dnd);
  }

  mounted(): void {
    window.addEventListener('keydown', this.keydownEventListener);
  }

  unmounted(): void {
    window.removeEventListener('keydown', this.keydownEventListener);
  }
}

</script>
