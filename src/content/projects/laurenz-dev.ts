import {
  carousel,
  file,
  heading,
  mediaImage,
  mediaVideo,
  paragraph,
  section,
  subheading,
  timeline,
} from '../../app/utils/content.utils';
import { Content } from '../../app/interfaces/content.interface';
import { ProjectPageEnvironment } from '../../app/pages/project/project.page';

export default [
  section(),
  section(),
  heading(`laurenz.dev`),
  paragraph(`
  A hub of information about myself and my work, as well as personal projects and apps.
  `),

  section(),
  heading(`Timeline`),
  timeline({ from: '2023-09-18', to: 'ongoing' }),
  paragraph(`
  Started in September, I aim to check all planned features off quickly and to then iterate on them regularly, but
  less frequently. The project will continue in fast-mode for a few more months.
  `),

  section(),
  heading(`Upcoming features`),

  subheading(`More & better-looking project details`),
  paragraph(`
  Currently, not all previous projects have content associated with them. This will be a priority over the next few weeks.
  `),
  paragraph(`
  Also, I will refine the way I can write content for this site. One part of this will be the support of Markdown and
  links inside text.
  `),

  subheading(`Improved accessibility`),
  paragraph(`
  There are a few spots with bigger issues, and a few others with minor ones.
  For example, the fullscreen image carousel has no navigation aids at all.
  `),
  paragraph(`
  Also, I didn't have time yet to do a small UX test, but I will get this done soon.
  It will help immensely with planning for future UX improvements, and also aligning the content
  with what people want to see. It's also planned to keep these tests coming and I also want to invest
  quite some time in proper tests. I will need to re-familiarize myself with the methodologies and
  probably read a few extra resources. I am really looking forward to it.
  `),

  subheading(`Blog page`),
  paragraph(`
  This is a big new feature, coming up at the end of 2023. It's an additional page accessible via the main
  navigation menu, where you can find new 'blog'-style posts from me. I want to focus on things I am interested in
  and the posts will be pretty infrequent.
  `),

  subheading(`Résumé / CV page`),
  paragraph(`
  The last big feature planned for the site is the CV page. Here you will find my CV (obviously 😁), but I want to
  try to make a good-looking and understandable visualization. Possibly similar to the timeline above.
  `),
  paragraph(`
  I did try to implement such a visualization before, but never fully finished it because the design turned out to be
  quite challenging. We'll see..
  `),

  subheading(`Technical improvements`),
  paragraph(`
  After dipping my toes in other frameworks for three years, before deciding to just finish the Website in Angular
  with a less experimental design, I will instead use the time to improve my SEO skills, try Angular SSR and a more
  modular project structure, all with the goal to provide a smoother experience.
  `),
  paragraph(`
  One thing I urgently have to figure out is why the scroll position is not properly restored on page reload. I will
  invest in a solution to this (a functioning back button that uses the browser history was already part of this
  effort).
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/assets/content/projects/laurenz-dev/bg.jpg', ''),
} satisfies ProjectPageEnvironment;
