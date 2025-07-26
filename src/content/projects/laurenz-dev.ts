import {
  Content,
  heading,
  mediaImage,
  paragraph,
  section,
  subheading,
  timeline,
} from '../../app/feature-content';
import { ProjectPageEnvironment } from '../../app/feature-dev/project/project.page';

export default [
  section(),
  section(),
  heading(`laurenz.dev`),
  paragraph(`
  A hub of information about myself and my work, personal projects and apps.
  `),
  paragraph(`
  First released: 2023-09-24
  `),

  timeline({ from: '2023-09-18', to: 'ongoing' }),

  paragraph(`
  Over the course of three years I repeatedly tried to create a personal website. I tried a few
  different technologies and changed the design completely each time.
  In the end I decided to finish the project quickly using Angular and with a less experimental design.
  `),
  paragraph(`
  I have plans to expand the website in the future and continually improve it, so I can use the source
  code as a reference work for the future.
  `),

  section(),
  heading(`Upcoming features`),

  subheading(`Improved accessibility`),
  paragraph(`
  There are a few spots with bigger issues, and a few others with minor ones.
  For example, the fullscreen image carousel has no navigation aids at all.
  `),

  subheading(`Blog page`),
  paragraph(`
  This is a big new feature, coming up at the end of 2023. It's an additional page accessible via the main
  navigation menu, where you can find new 'blog'-style posts from me. I want to focus on things I am interested in
  and the posts will be pretty infrequent.
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/content/projects/laurenz-dev/bg.jpg', ''),
} satisfies ProjectPageEnvironment;
