<script setup lang="ts">
import { RouterView } from 'vue-router';
import { provide } from 'vue';
import { DartService } from '@/services/dart.service';

provide('DartService', new DartService());
</script>

<template>
  <RouterView />
</template>
