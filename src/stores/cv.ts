import { reactive } from 'vue';
import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useCVStore = defineStore('cv', () => {
  const store = reactive({
    places: [
      {
        at: 'Care Development',
        position: 'Software Engineer',
        date: { from: dayjs('2022-10'), to: dayjs() },
        projects: [],
        description: '',
        logoUrl: '',
        barClasses: 'red-400 dark:green-200',
      },
      {
        at: 'TU Wien',
        position: "Bachelors' Degree",
        date: { from: dayjs('2018-10'), to: dayjs() },
        projects: [],
        description: '',
        logoUrl: '',
        barClasses: 'red-400 dark:green-200',
      },
      {
        at: 'University of Salzburg',
        position: 'Freelance Software Engineer',
        date: { from: dayjs('2017-12'), to: dayjs() },
        projects: [],
        description: '',
        logoUrl: '',
        barClasses: 'red-400 dark:green-200',
      },
      {
        at: 'Sony DADC Austia GmbH',
        position: 'Apprenticeship Software Engineer',
        date: { from: dayjs('2013-08'), to: dayjs('2017-01-31').endOf('day') },
        projects: [],
        description: '',
        logoUrl: '',
        barClasses: 'red-400 dark:green-200',
      },
      {
        at: 'Universal Music Austria GmbH',
        position: 'Software Engineer',
        date: { from: dayjs('2017-12'), to: dayjs('2018-07-31').endOf('day') },
        projects: [],
        description: '',
        logoUrl: '',
        barClasses: 'red-400 dark:green-200',
      },
    ],
    projects: [
      {
        title: 'Matterialist',
        technologies: ['C++', 'OpenGL', 'Nvidia PhysX', 'Blender'],
        description: '',
        date: { from: dayjs('2020-03'), to: dayjs('2020-06-30').endOf('day') },
      },
    ],
  });

  return { store };
});
