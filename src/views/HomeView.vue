<script setup lang="ts">
import { useCVStore } from '@/stores/cv';
import { onMounted } from 'vue';

const store = useCVStore();

class Row {
  maxYear = 0;
  events: Array<any> = [];
}

let rows: Array<Row> = [new Row(), new Row(), new Row()];
let startDate = store.store.places
  .map((value) => value.date.from)
  .sort((a, b) => a.diff(b))[0];
let endDate = store.store.places
  .map((value) => value.date.to)
  .sort((a, b) => b.diff(a))[0];

store.store.places
  .slice()
  .sort((a, b) => a.date.to.diff(a.date.from, 'year', true))
  .forEach((value) => {
    let start2 = value.date.from.diff(startDate, 'year', true);
    let duration = value.date.to.diff(value.date.from, 'year', true);
    for (let row of rows) {
      if (row.maxYear > start2 + duration) {
        continue;
      }
      row.maxYear = start2 + duration;
      row.events.push(value);
      break;
    }
  });

const yearWidthPx = 600;

let hasReceivedScrollXEvent = false;

document.addEventListener('wheel', (ev: WheelEvent) => {
  if (ev.deltaX !== 0) {
    hasReceivedScrollXEvent = true;
  }
});

document.addEventListener('touchmove', (ev: TouchEvent) => {
  hasReceivedScrollXEvent = true;
});

let start: number;
let previousTimeStamp: DOMHighResTimeStamp;
let done = false;

const bezier = (by: number, cy: number, t: number) => {
  return (
    3 * Math.pow(1 - t, 2) * t * by +
    3 * (1 - t) * Math.pow(t, 2) * cy +
    Math.pow(t, 3)
  );
};

const step = (timestamp: DOMHighResTimeStamp) => {
  if (start === undefined) {
    start = timestamp;
  }
  const doc = document.documentElement;
  const scrollWidth = doc.scrollWidth - doc.offsetWidth;
  const elapsed = timestamp - start;
  const total = scrollWidth * 0.5;
  const t = elapsed / total;

  if (hasReceivedScrollXEvent) {
    done = true;
  }

  if (!done && previousTimeStamp !== timestamp) {
    const scrollLeft = Math.min(bezier(0.5, 1, t) * scrollWidth, scrollWidth);
    doc.scrollLeft = scrollLeft;
    if (scrollLeft === scrollWidth) done = true;
  }

  if (elapsed < total) {
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
};

const callback = (intersections: Array<IntersectionObserverEntry>) => {
  intersections.forEach((intersection) => {
    if (intersection.intersectionRatio > 0) {
      intersection.target.classList.add('intro');
      observer.unobserve(intersection.target);
    }
  });
};

let observer = new IntersectionObserver(callback, {
  threshold: 0.01,
});

onMounted(() => {
  const animEls = document.querySelectorAll('.event');
  animEls.forEach((el) => {
    el.classList.remove('intro');
    observer.observe(el);
  });

  //document.documentElement.scrollLeft = 9999;
  window.requestAnimationFrame(step);
});
</script>

<template>
  <div class="content-wrapper">
    <div class="event-bars">
      <div
        v-for="(a, index) in rows"
        :key="a"
        class="event-bar"
        :style="{
          width: `${yearWidthPx * endDate.diff(startDate, 'year', true)}px`,
        }">
        <div
          v-for="b in a.events"
          :key="b"
          class="event"
          :style="{
            top: `${index * 6}rem`,
            left: `${
              yearWidthPx * b.date.from.diff(startDate, 'year', true)
            }px`,
            width: `${
              yearWidthPx * b.date.to.diff(b.date.from, 'year', true)
            }px`,
          }">
          {{ b.at }}
          <!--<small>{{ a.position }}</small>
          {{ a.date.from.format('YYYY/MM') }} - {{ a.date.to.format('YYYY/MM') }}-->
        </div>
      </div>
    </div>

    <div class="inline-block">
      <div class="event logo-container">
        <div class="text-black dark:text-white pr-4">laurenz</div>
        <div class="dev">dev</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  @apply w-max flex flex-row;

  margin: 50vh 0 0 50vw;
  transform: translateY(-50%);
}

.event-bars {
  @apply inline-block;
}

.event-bar {
  @apply relative;

  height: 1px;

  > * {
    flex-shrink: 0;
  }
}

.event {
  @apply flex flex-row items-center bg-primary text-white rounded-full py-1 px-3 m-2 text-lg opacity-0 whitespace-nowrap;

  &:not(.logo-container) {
    position: absolute;
  }

  &.intro {
    @apply opacity-100;

    animation: 500ms -anim-event-intro ease-in-out;
  }
}

@media only screen and (max-width: theme('screens.sm')) {
  .event {
    @apply py-2 px-4 text-[1.75rem];

    &.intro {
      animation: 250ms -anim-event-intro ease-in-out;
    }
  }
}

.logo-container {
  @apply flex flex-row bg-transparent opacity-0;

  margin-right: 50vw;
  margin-left: 20vw;
  transform: translateX(50%) scale(150%);

  &.intro {
    @apply opacity-100;

    animation: 1s -anim-logo-intro ease-in-out;
  }

  > .dev {
    @apply flex flex-row items-center rounded-full bg-secondary text-white font-semibold px-4 md:px-6 -my-3 -mr-6;

    background: linear-gradient(
      to top right,
      theme('colors.secondary'),
      theme('colors.primary')
    );
  }
}

@keyframes -anim-event-intro {
  0% {
    opacity: 0;
    transform: translateX(300px) scale(150%);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(100%);
  }
}

@keyframes -anim-logo-intro {
  0%,
  25% {
    opacity: 0;
    transform: translateX(50%) scale(250%);
  }
  100% {
    opacity: 1;
    transform: translateX(50%) scale(150%);
  }
}
</style>
