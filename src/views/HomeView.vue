<script setup lang="ts">
import { inject } from 'vue';
import { ThemeService } from '@/services/ThemeService';

const $themeService = inject('ThemeService') as ThemeService;
</script>

<template>
  <div>
    <div class="banner">
      <img class="d-dark" src="/src/assets/logo/banner.svg" />
      <img class="d-light" src="/src/assets/logo/light/banner.svg" />
    </div>

    <router-link class="link with-bar end-s" to="/projects">
      <span>projects</span>
    </router-link>
    <router-link class="link with-bar end-t" to="/contact">
      <span>contact</span>
    </router-link>
    <router-link class="link with-bar end-k" to="/work">
      <span>work</span>
    </router-link>
    <!--<div class="separator"></div>
    <router-link class="link end-d" to="/">
      <span>D &amp; D</span>
    </router-link>
    <router-link class="link end-s" to="/">
      <span>darts</span>
    </router-link>-->

    <div class="separator"></div>

    <div class="fs-xl flex-row flex-wrap my-3">
      <span class="heading lh-fix me-1 flex-grow-1">high contrast</span>
      <div class="with-bar end-button flex-grow-1">
        <div class="flex-row child-base-0 position-relative z-1">
          <button
            :class="$themeService.contrast.value === 'high' ? 'active' : null"
            @click="$themeService.setContrast('high')"
          >
            <template v-if="$themeService.contrast.value === 'high'">✓ </template>enable
          </button>
          <button
            :class="$themeService.contrast.value === 'low' ? 'active' : null"
            @click="$themeService.setContrast('low')"
          >
            <template v-if="$themeService.contrast.value === 'low'">✓ </template>disable
          </button>
        </div>
      </div>
    </div>

    <div class="fs-xl flex-row flex-wrap my-3">
      <span class="heading lh-fix me-1">font scale</span>
      <div class="with-bar flex-grow-1">
        <div class="flex-row child-base-0 position-relative z-1">
          <button
            :class="$themeService.fontScale.value === 'normal' ? 'active' : null"
            @click="$themeService.setFontScale('normal')"
          >
            <template v-if="$themeService.fontScale.value === 'normal'">✓ </template>normal
          </button>
          <button
            :class="$themeService.fontScale.value === 'lg' ? 'active' : null"
            @click="$themeService.setFontScale('lg')"
          >
            <template v-if="$themeService.fontScale.value === 'lg'">✓ </template>large
          </button>
          <button
            :class="$themeService.fontScale.value === 'xl' ? 'active' : null"
            @click="$themeService.setFontScale('xl')"
          >
            <template v-if="$themeService.fontScale.value === 'xl'">✓ </template>very large
          </button>
        </div>
      </div>
    </div>

    <div class="fs-xl flex-row flex-wrap mt-3 mb-8">
      <span class="heading lh-fix me-1">appearance</span>
      <div class="with-bar flex-grow-1">
        <div class="flex-row child-base-0 position-relative z-1">
          <button
            :class="$themeService.appearance.value === 'system' ? 'active' : null"
            @click="$themeService.setAppearance('system')"
          >
            <template v-if="$themeService.appearance.value === 'system'">✓ </template>system
          </button>
          <button
            :class="$themeService.appearance.value === 'dark' ? 'active' : null"
            @click="$themeService.setAppearance('dark')"
          >
            <template v-if="$themeService.appearance.value === 'dark'">✓ </template>dark
          </button>
          <button
            :class="$themeService.appearance.value === 'light' ? 'active' : null"
            @click="$themeService.setAppearance('light')"
          >
            <template v-if="$themeService.appearance.value === 'light'">✓ </template>light
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  height: 500px;
  max-height: 85svh;
  background: url('/src/assets/logo/banner_rep.svg') left / contain repeat-x;
  margin-bottom: 2rem;

  > img {
    height: 100%;
    background-color: var(--color-bg);
  }
}

// TODO move to global theme
.link {
  $maskPositionRight: 0.1em;
  $focusLetterSpacing: 0.1em;

  user-select: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s, letter-spacing 0.35s;
  margin: 1.5rem 0;
  font-size: 2.75rem; // TODO common font sizes

  &:focus,
  &:hover {
    letter-spacing: $focusLetterSpacing;

    // label
    > span {
      color: var(--color-primary);

      // label mask
      &::after {
        right: $maskPositionRight + $focusLetterSpacing;
      }
    }

    // bar
    &::after {
      background-color: var(--bg-bar-primary);
    }
  }
}

.separator {
  margin: 0.75rem 0;
  height: 0.75rem;
  background-color: var(--bg-bar);
}
</style>

<style>
a {
  text-decoration: none;
}
</style>
