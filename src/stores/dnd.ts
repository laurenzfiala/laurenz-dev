import { reactive } from 'vue';
import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useDndStore = defineStore('dnd', () => {
  const store = reactive({});

  return { store };
});
