<script setup lang="ts">
import { useCVStore } from '@/stores/cv';

const cv = useCVStore();
</script>

<template>
  <p>{{ cv.store.places }}</p>
</template>

<style scoped></style>
