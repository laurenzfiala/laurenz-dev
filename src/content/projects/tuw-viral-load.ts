import {
  carousel,
  Content,
  heading,
  mediaImage,
  paragraph,
  section,
  timeline,
} from '../../app/feature-content';
import { ProjectPageEnvironment } from '../../app/feature-dev/project/project.page';

export default [
  section(true),
  carousel(
    mediaImage(
      '/content/projects/tuw-viral-load/1.webp',
      `
      Top-down view of a pixel-art corridor with the player character looking through pillars at a security
      guard.
      `,
    ),
    mediaImage(
      '/content/projects/tuw-viral-load/2.webp',
      `
      A top-down view of a room where the player character is chased by a security guard.
      `,
    ),
    mediaImage(
      '/content/projects/tuw-viral-load/3.webp',
      `
      The game-over screen that says 'You got caught! 2 lives left'.
      `,
    ),
  ),
  section(),
  heading(`Viral Load`),
  paragraph(`
  A small top-down stealth game using Android canvas. Developed together in a team of two.
  `),

  section(),
  section(),
  timeline({ from: '2021-03', to: '2021-06' }),
  paragraph(`
  The goal of the game is to descend down the floors of a skyscraper using an elevator.
  Each subsequent floor requires an access code from the floor above. Once on a floor,
  the players have to avoid the guards. The guard will hunt the players when they see them,
  taking into account a navmesh.
  Another big feature was the shadows, which my teammate spent many hours perfecting.
  `),
  paragraph(`
  All in all, we were really happy how it turned out, even though we had to compromise on
  polish and level design to meet the deadline.
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/content/projects/tuw-viral-load/bg.webp', ''),
} satisfies ProjectPageEnvironment;
