<script setup lang="ts">
import { provide } from 'vue';
import { ThemeService } from '@/services/ThemeService';

provide('ThemeService', new ThemeService());
</script>

<template>
  <RouterView />
</template>
