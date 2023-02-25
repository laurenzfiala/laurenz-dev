<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();

const show = ref(true);
const update = (meta: any) => {
  if (meta.showNav || meta.showNav === undefined) {
    show.value = true;
  } else {
    show.value = false;
  }
};

watch(
  () => route.meta,
  async (meta) => {
    console.log(meta);
    update(meta);
  },
  { immediate: true },
);
</script>

<template>
  <main class="flow-root min-h-full relative">
    <RouterView />
  </main>

  <div class="fixed bottom-0 w-full border-t" :class="{ hidden: !show }">
    <nav>
      <router-link
        class="flex flex-col"
        to="/"
        exact-active-class="active"
        tabindex="-1">
        <button>
          <div class="icon-container">
            <i class="i i-cv i-light on-active"></i>
            <i class="i i-cv i-dark dark:i-light"></i>
          </div>
          <span>Contact &amp; CV</span>
        </button>
      </router-link>
      <router-link
        class="flex flex-col"
        to="/dnd"
        active-class="active"
        tabindex="-1">
        <button>
          <div class="icon-container">
            <i class="i i-dnd i-light on-active"></i>
            <i class="i i-dnd i-dark dark:i-light"></i>
          </div>
          <span>D&amp;D</span>
        </button>
      </router-link>
      <router-link
        class="flex flex-col"
        to="/darts"
        active-class="active"
        tabindex="-1">
        <button>
          <div class="icon-container">
            <i class="i i-dart i-light on-active"></i>
            <i class="i i-dart i-dark dark:i-light"></i>
          </div>
          <span>Darts</span>
        </button>
      </router-link>
      <router-link
        class="flex flex-col"
        to="/imprint"
        active-class="active"
        tabindex="-1">
        <button>
          <div class="icon-container">
            <i class="i i-imprint i-light on-active"></i>
            <i class="i i-imprint i-dark dark:i-light"></i>
          </div>
          <span>Imprint</span>
        </button>
      </router-link>
      <a
        class="flex flex-col hover-none:hidden"
        href="ts3server://laurenz.dev"
        tabindex="-1">
        <button>
          <div class="icon-container">
            <i class="i i-ts i-light on-active"></i>
            <i class="i i-ts i-dark dark:i-light"></i>
          </div>
          <span>Teamspeak</span>
        </button>
      </a>
      <a
        class="flex flex-col"
        href="https://github.com/laurenzfiala"
        tabindex="-1">
        <button>
          <div class="icon-container">
            <i class="i i-github i-light on-active"></i>
            <i class="i i-github i-dark dark:i-light"></i>
          </div>
          <span>Github</span>
        </button>
      </a>
    </nav>
  </div>
</template>

<style scoped>
nav {
  @apply bg-body font-medium flex flex-row px-0.5 mx-auto overflow-x-auto;

  max-width: theme('screens.lg');

  > a {
    @apply basis-0 shrink-0 grow py-1 px-0.5 whitespace-nowrap;

    &:hover,
    &:active {
      button {
        background-color: var(--button-bg-color-hover);
      }
    }

    &.active {
      @apply text-white dark:text-zinc-200;

      button {
        animation: theme('transitions.medium') -anim-button-bg ease-in-out,
          theme('transitions.medium') -anim-button-shadow ease-in-out;
        background: linear-gradient(
          to right,
          theme('colors.secondary'),
          theme('colors.primary'),
          var(--button-bg-color-hover),
          var(--button-bg-color-hover)
        );
        background-size: 400% 100%;
      }
    }

    > button {
      @apply flex flex-row justify-center;

      transition: background-color theme('transitions.short');

      > span {
        @apply hidden md:inline ml-2;
      }
    }
  }
}

.icon-container {
  @apply block /*md:hidden*/;

  position: relative;

  width: var(--nav-icon-container-size);
  height: var(--nav-icon-container-size);

  > i {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: var(--nav-icon-opacity);

    transition: opacity theme('transitions.short');
  }
}

.active .icon-container > i {
  opacity: 0;
  animation: theme('transitions.medium') -anim-button-icon ease-in-out;

  &.on-active {
    opacity: 1;
    animation: theme('transitions.medium') -anim-button-icon-active ease-in-out;
  }
}

@keyframes -anim-button-icon {
  0% {
    opacity: var(--nav-icon-opacity);
  }
  75%,
  100% {
    opacity: 0;
  }
}

@keyframes -anim-button-icon-active {
  0%,
  25% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes -anim-button-bg {
  0% {
    @apply text-zinc-700;
    background-position-x: 100%;
  }
  100% {
    @apply text-zinc-200;
    background-position-x: 0;
  }
}

@keyframes -anim-button-shadow {
  0% {
    box-shadow: 0 0 0 0 rgb(var(--color-primary) / 0.5);
  }
  80% {
    box-shadow: 0 0 0 5px rgb(var(--color-secondary) / 0.2);
  }
  100% {
    box-shadow: 0 0 0 5px rgb(var(--color-secondary) / 0);
  }
}
</style>
