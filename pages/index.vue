<template>
  <div class="h-screen flex flex-row items-center justify-center bg-gray-50 root p-6">

    <div class="main-container">
      <div class="text-5xl">
        laurenz <span class="ml-1 bg-gradient-to-r from-green-300 to-blue-300 rounded-full px-4 pt-1 text-gray-50">dev</span>
      </div>
      <div class="mt-6">
        <a href="mailto:mail@laurenz.dev">mail@laurenz.dev</a>
      </div>
    </div>

    <div class="timeline-container">

      <div class="flex flex-row">

        <div class="ml-6">
            <span class="text-5xl bg-gray-200 rounded-full px-4 pt-1 text-gray-50 pr-12">
              Cool Trees and Sensors
            </span>
        </div>

        <div class="ml-6">
            <span class="text-5xl bg-gray-200 rounded-full px-4 pt-1 text-gray-50 pr-12">
              Cool Trees and Sensors
            </span>
        </div>

      </div>

    </div>

  </div>
</template>

<style>

@font-face {
  font-family: Comfortaa;
  src: url("static/fonts/Comfortaa-Regular.ttf");
}

body {
  font-family: Comfortaa, sans-serif;
}

a {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500;
}

a:hover,
a:focus {
  font-weight: bold;
}

.root {
  position: relative;
  overflow-x: auto;
}

.main-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -1.5rem);

  text-align: center;
}

.timeline-container {
  position: absolute;
  top: 50%;
  left: 90vw;
  transform: translateY(-1.5rem);

  & * {
    flex-shrink: 0;
  }
}

</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
