<template>
  <div class="nav flex flex-row flex-wrap">
    <RouterLink to="/dnd">
      <img src="/src/assets/icon/dnd/nav_exit.png" />
    </RouterLink>
    <div class="spacer grow inline-flex flex-row text-lg m-2">
      <input type="text" placeholder="Search" class="grow bg-transparent" />
    </div>
    <div class="icons flex flex-row">
      <RouterLink to="/dnd/dice" active-class="active">
        <img src="/src/assets/icon/dnd/nav_dice.png" />
      </RouterLink>
      <RouterLink to="/dnd/fight" active-class="active"> fight </RouterLink>
      <RouterLink to="/dnd/stats" active-class="active">
        <img src="/src/assets/icon/dnd/nav_stats.png" />
      </RouterLink>
      <RouterLink to="/dnd/inventory" active-class="active">
        <img src="/src/assets/icon/dnd/nav_inventory.png" />
      </RouterLink>
      <RouterLink to="/dnd/spells" active-class="active">
        <img src="/src/assets/icon/dnd/nav_spells.png" />
      </RouterLink>
      <RouterLink to="/dnd/beasts" active-class="active">
        <img src="/src/assets/icon/dnd/nav_beasts.png" />
      </RouterLink>
      <RouterLink to="/dnd/character" active-class="active">
        <img src="/src/assets/icon/dnd/nav_character.png" />
      </RouterLink>
      <RouterLink to="/dnd/pad" active-class="active">
        <img src="/src/assets/icon/dnd/nav_pad.png" />
      </RouterLink>
      <RouterLink to="/dnd/settings" active-class="active">
        <img src="/src/assets/icon/dnd/nav_settings.png" />
      </RouterLink>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
img {
  @apply w-[1.7rem] md:w-[2.5rem] h-[1.7rem] md:h-[2.5rem];
}

.icons {
  > * {
    @apply grow shrink-0 p-1;
  }

  .active {
    @apply relative pb-2;

    &::after {
      content: '';
      @apply absolute block w-[13px] h-[5px] bg-black/50 dark:bg-white/50 rounded-full;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
