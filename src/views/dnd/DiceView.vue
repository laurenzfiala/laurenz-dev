<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

interface DieRoll {
  sides: number;
  roll: number;
}

let rolls = reactive<Array<DieRoll>>([]);
let latestRollEl = ref<HTMLDivElement>();

const rollDie = (sides: number) => {
  let roll = Math.ceil(
    (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * sides,
  );
  rolls.unshift({ sides, roll });
  latestRollEl.value?.classList.toggle('new');
  latestRollEl.value?.classList.toggle('new2');
  if (roll === 20 && roll === sides) {
    latestRollEl.value?.classList.add('nat20');
  } else if (roll === 1 && sides === 20) {
    latestRollEl.value?.classList.add('fail20');
  } else {
    latestRollEl.value?.classList.remove('nat20', 'fail20');
  }
};

const latestRoll = computed(() => {
  return rolls.length > 0 ? rolls[0] : undefined;
});
const latestRolls = computed(() => {
  return rolls.slice(1, 4);
});
</script>

<template>
  <div class="max-w-screen overflow-clip">
    <div class="container h-screen pb-[3rem]">
      <div class="flex flex-col h-full">
        <div class="text-center">
          <div ref="latestRollEl" class="roll new">
            <i class="i i-dark mr-2" :class="`i-dnd-d${latestRoll?.sides}`"></i>
            <span>{{ latestRoll?.roll }}</span>
          </div>
          <div
            v-for="roll in latestRolls"
            :key="roll"
            class="roll-sm"
            :class="{
              nat20: roll?.roll === 20 && roll?.sides === 20,
              fail20: roll?.roll === 1 && roll?.sides === 20,
            }">
            <i class="i i-dark mr-2" :class="`i-dnd-d${roll?.sides}`"></i>
            {{ roll.roll }}
          </div>
        </div>

        <div class="grow"></div>

        <div class="flex flex-row justify-around flex-wrap -m-2 sm:m-0">
          <div class="die" role="button" tabindex="0" @click="rollDie(4)">
            <i class="i i-dnd-d4 i-dark on-active"></i>
            <div class="value">4</div>
          </div>
          <div class="die" role="button" tabindex="0" @click="rollDie(6)">
            <i class="i i-dnd-d6 i-dark on-active"></i>
            <div class="value">6</div>
          </div>
          <div class="die" role="button" tabindex="0" @click="rollDie(8)">
            <i class="i i-dnd-d8 i-dark on-active"></i>
            <div class="value">8</div>
          </div>
          <div class="die" role="button" tabindex="0" @click="rollDie(10)">
            <i class="i i-dnd-d10 i-dark on-active"></i>
            <div class="value">10</div>
          </div>
          <div class="die" role="button" tabindex="0" @click="rollDie(12)">
            <i class="i i-dnd-d12 i-dark on-active"></i>
            <div class="value">12</div>
          </div>
          <div class="die" role="button" tabindex="0" @click="rollDie(20)">
            <i class="i i-dnd-d20 i-dark on-active"></i>
            <div class="value">20</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roll {
  @apply inline-flex flex-row justify-center items-center py-1 px-6 mt-6 text-[6rem];

  &.new {
    > .i {
      animation: theme('transitions.medium') -anim-die-rolled ease-in-out forwards;
    }
    > span {
      animation: theme('transitions.medium') -anim-roll-bg ease-in-out forwards;
    }
  }

  &.new2 {
    > .i {
      animation: theme('transitions.medium') -anim-die-rolled2 ease-in-out forwards;
    }
    > span {
      animation: theme('transitions.medium') -anim-roll-bg2 ease-in-out forwards;
    }
  }

  &.nat20 {
    &.new {
      > .i {
        animation: 500ms -anim-die-rolled-nat20 ease-in-out forwards;
        &::before {
          animation: 500ms -anim-die-rolled-nat20-splash linear;
        }
      }
    }
    &.new2 {
      > .i {
        animation: 500ms -anim-die-rolled-nat20-2 ease-in-out forwards;
        &::before {
          animation: 500ms -anim-die-rolled-nat20-splash-2 linear;
        }
      }
    }
    > .i {
      background-image: url('@/assets/icon/dnd/dnd_nat20.png');
      &::before {
        content: '';
        @apply block bg-center bg-contain w-full h-full;
        background-image: url('@/assets/icon/dnd/dnd_nat20.png');
      }
    }
    > span {
      background-image: linear-gradient(
        to right,
        theme('colors.secondary'),
        theme('colors.primary') 34%,
        transparent 65%,
        transparent
      );
    }
  }

  &.fail20 {
    &.new {
      > .i {
        animation: 500ms -anim-die-rolled-fail20 ease-in-out forwards;
        &::before {
          animation: 500ms -anim-die-rolled-fail20-splash linear forwards;
        }
      }
    }
    &.new2 {
      > .i {
        animation: 500ms -anim-die-rolled-fail20-2 ease-in-out forwards;
        &::before {
          animation: 500ms -anim-die-rolled-fail20-splash-2 linear forwards;
        }
      }
    }
    > .i {
      background-image: url('@/assets/icon/dnd/d20_dark.png');
      .dark & {
        background-image: url('@/assets/icon/dnd/d20.png');
      }
      &::before {
        content: '';
        @apply block bg-center bg-contain w-full h-full opacity-50;
        transform: scale(1.25);
        background-image: url('@/assets/icon/dnd/d20_dark.png');
        .dark & {
          background-image: url('@/assets/icon/dnd/d20.png');
        }
      }
    }
    > span {
      background-image: linear-gradient(
        to right,
        theme('colors.text'),
        theme('colors.text') 34%,
        transparent 65%,
        transparent
      );
    }
  }

  > span {
    background-image: linear-gradient(
      to right,
      theme('colors.text'),
      theme('colors.text') 34%,
      transparent 65%,
      transparent
    );
    background-size: 300% 100%;
    background-position-x: 100%;
    background-clip: text;
    color: transparent;
  }
}

.roll-sm {
  @apply flex flex-row items-center justify-center;
  &.nat20 {
    background-image: linear-gradient(
      to right,
      theme('colors.secondary'),
      theme('colors.primary')
    );
    background-size: 100%;
    background-clip: text;
    color: transparent;

    > .i {
      background-image: url('@/assets/icon/dnd/dnd_nat20.png');
    }
  }
}

.die {
  @apply w-[100px] h-[100px] xs:w-[150px] xs:h-[150px] sm:w-[170px] sm:h-[170px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px];
  @apply relative shrink cursor-pointer select-none text-center mx-2 mt-2 sm:mx-0 sm:mt-0 mb-4 md:mb-6;

  &:hover,
  &:focus {
    > .i {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.95);
    }
    .value {
      @apply opacity-75 font-bold;
      transform: translate(-50%, -10%);
    }
  }

  &:active {
    > .i {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.75);
    }
  }

  > .i {
    @apply absolute w-full h-full opacity-75;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transition: opacity theme('transitions.short'),
      transform theme('transitions.short');
  }

  .value {
    @apply text-[25px] md:text-[40px] opacity-25 font-semibold;
    @apply absolute inline-block;
    top: calc(100% - 10px);
    left: 50%;
    transform: translate(-50%, 0%);
    transition: transform theme('transitions.short'),
      opacity theme('transitions.short'), font-weight theme('transitions.short');
  }
}

/* die result text bg */

@keyframes -anim-roll-bg {
  0% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: 0;
  }
}

@keyframes -anim-roll-bg2 {
  0% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: 0;
  }
}

/* die roll */

@keyframes -anim-die-rolled {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
  100% {
  }
}

@keyframes -anim-die-rolled2 {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
  100% {
  }
}

/* nat 20 */

@keyframes -anim-die-rolled-nat20 {
  0% {
    opacity: 0.5;
    transform: rotate(-120deg);
  }
  70% {
    opacity: 1;
    transform: rotate(15deg) scale(1.3);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes -anim-die-rolled-nat20-2 {
  0% {
    opacity: 0.5;
    transform: rotate(-120deg);
  }
  70% {
    opacity: 1;
    transform: rotate(15deg) scale(1.3);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes -anim-die-rolled-nat20-splash {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.75);
  }
}

@keyframes -anim-die-rolled-nat20-splash-2 {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.75);
  }
}

/* fail 20 */

@keyframes -anim-die-rolled-fail20 {
  0% {
    opacity: 0.5;
    transform-origin: bottom center;
    transform: scale(1.5) rotate(-30deg);
  }
  66% {
    transform: scale(1.15) rotate(30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes -anim-die-rolled-fail20-2 {
  0% {
    opacity: 0.5;
    transform-origin: bottom center;
    transform: scale(1.5) rotate(-30deg);
  }
  66% {
    transform: scale(1.15) rotate(30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes -anim-die-rolled-fail20-splash {
  0% {
    transform-origin: bottom center;
    transform: scale(1.25) rotate(-15deg);
  }
  66% {
    transform: scale(1.1) rotate(15deg);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes -anim-die-rolled-fail20-splash-2 {
  0% {
    transform-origin: bottom center;
    transform: scale(1.25) rotate(-15deg);
  }
  66% {
    transform: scale(1.1) rotate(15deg);
  }
  100% {
    transform: scale(1);
  }
}
</style>
