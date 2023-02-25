<script setup lang="ts">
import { inject } from 'vue';
import { DartService } from '@/services/dart.service';

const dartService: DartService = inject('DartService')!;
</script>

<template>
  Darts

  <p>
    {{ dartService.test }}
  </p>
</template>

<style></style>
