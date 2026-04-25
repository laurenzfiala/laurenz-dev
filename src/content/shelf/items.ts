import { bluRay, book, cinemaMovie } from '../../app/shelf';

export default [
  book({
    title: 'Black Ember',
    author: 'Helia James',
    isbn13: '9783769311587',
    coverPath: '/content/shelf/handbook-of-usability-testing.svg',
    reading: true,
    nsfw: true,
  }),
  book({
    title: 'Handbook of Usability Testing',
    author: 'Jeffrey Rubin, Dana Chisnell',
    isbn13: '9780470185483',
    coverPath: '/content/shelf/handbook-of-usability-testing.svg',
    reading: true,
  }),
  bluRay({
    title: 'Flow',
    imdbId: 'tt4772188',
    coverPath: '/content/shelf/flow.svg',
    rating: 8,
    watchedOn: '2026-04-23',
  }),
  bluRay({
    title: 'Wolfwalkers',
    imdbId: 'tt5198068',
    coverPath: '/content/shelf/wolfwalkers.svg',
    rating: 8.5,
    watchedOn: '2026-04-16',
  }),
  cinemaMovie({
    title: 'Project Hail Mary',
    imdbId: 'tt12042730',
    coverPath: '/content/shelf/project-hail-mary.svg',
    rating: 9,
    watchedOn: '2026-04-09',
  }),
  cinemaMovie({
    title: 'Iron Lung',
    imdbId: 'tt27564844',
    coverPath: '/content/shelf/iron-lung.svg',
    rating: 7,
    watchedOn: '2026-02-07',
  }),
  cinemaMovie({
    title: 'Iron Lung',
    imdbId: 'tt27564844',
    coverPath: '/content/shelf/iron-lung.svg',
    rating: 7,
    watchedOn: '2026-02-07',
  }),
];
