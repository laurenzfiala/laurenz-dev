<template>
  <div class="h-full">

    <div class="main-container">
      <div class="logo">
        laurenz <span class="badge">dev</span>
      </div>
      <div class="contact">
        <a href="mailto:mail@laurenz.dev">mail@laurenz.dev</a>
      </div>
    </div>
    <div class="apps">
      <NuxtLink role="button" to="dnd">D&amp;D pad+</NuxtLink>
      <NuxtLink role="button" to="darts">Dartcounter</NuxtLink>
      <a role="button" href="ts3server://laurenz.dev">Teamspeak</a>
    </div>

    <!--<div class="timeline-container">
      <div class="year year1">2021</div>
      <div class="year year2">2020</div>
      <div class="year year3">2019</div>
      <div class="year year4">2018</div>
      <div class="year year5">2017</div>
      <div class="task task1">Test task 1</div>
      <div class="task task2">Test task 2</div>
      <div class="task task3">Test task 3</div>
    </div>-->

  </div>
</template>

<style lang="less" scoped>
@import (reference) "../assets/theme/variables";

.main-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;

  .logo {
    white-space: nowrap;
    @apply text-3xl xs:text-5xl;

    .badge {
      position: relative;
      z-index: 0;
      color: var(--bg-color);
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      @apply ml-1 rounded-full px-4 pt-1;
    }
  }
  .contact {
    @apply mt-5;

    a {
      transition: letter-spacing 0.35s, font-weight 0.35s, background-color 0.35s;
      background-color: var(--primary-color-dark);
      @apply text-transparent bg-clip-text;

      &:hover,
      &:focus {
        background-color: var(--secondary-color-dark);
        letter-spacing: 0.675em;
        font-weight: 800;
      }

      &::after {
        content: none;
      }
    }
  }
}

.apps {
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  margin: -0.25rem;
}

.timeline-container {
  position: absolute;
  top: 0;
  left: 95vw;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(5, 600px);
  grid-template-rows: 1fr auto auto auto 1fr;
  justify-items: start;
  align-items: stretch;

  .year {
    grid-row: 2 / span 3;

    position: relative;
    z-index: -1;
    transform: translateX(-50%);
    font-size: 1.25rem;

    @apply text-gray-300;

    &::before {
      content: "";

      position: absolute;
      left: 50%;
      top: 2em;
      bottom: -2rem;
      width: 1px;
      border-left: dashed #d1d5db 2px;
    }

    &::after {
      content: "";

      position: absolute;
      left: 50%;
      top: 2em;
      bottom: -2rem;
      width: 2px;

      background: linear-gradient(to bottom, var(--bg-color), transparent 20% 80%, var(--bg-color));
    }
  }

  .year1 {
    grid-column: 1;
  }

  .year2 {
    grid-column: 2;
  }

  .year3 {
    grid-column: 3;
  }

  .year4 {
    grid-column: 4;
  }

  .year5 {
    grid-column: 5;
  }

  .task {
    margin-top: 4rem;
    width: 100%;

    @apply px-6 py-2 text-xl;

    vertical-align: middle;
    border-radius: 9999px;
  }

  .task1 {
    grid-row: 3;
    grid-column: 1 / span 2;

    @apply bg-red-300;
  }

  .task2 {
    grid-row: 4;
    grid-column: 1 / span 5;

    margin-top: 1rem;

    @apply bg-green-300;
  }

  .task3 {
    grid-row: 3;
    grid-column: 3 / span 1;

    @apply bg-blue-300;
  }
}

</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
