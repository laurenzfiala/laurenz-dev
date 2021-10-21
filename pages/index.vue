<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">

    <div class="flex flex-row">

      <div class="flex flex-col items-center">
        <div class="text-5xl">
          laurenz <span class="ml-1 bg-gradient-to-r from-green-300 to-blue-300 rounded-full px-4 pt-1 text-gray-50">dev</span>
        </div>
        <div class="mt-6">
          <a href="mailto:mail@laurenz.dev">mail@laurenz.dev</a>
        </div>
      </div>

      <div class="ml-12">
        <span class="text-5xl bg-gray-200 rounded-full px-4 pt-1 text-gray-50 pr-12">
          Cool Trees and Sensors
        </span>
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

</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
