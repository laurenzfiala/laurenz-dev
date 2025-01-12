import { paragraph, section, timeline } from '../../app/feature-content';
import { Content } from '../../app/feature-content';
import { CvEntryDetailsEnvironment } from '../../app/feature-cv/cv-entry-details/cv-entry-details.component';

export default [
  section(),
  paragraph(`
  Right after my compulsory civil service I started to work at Universal Music (UMG).
  I already knew I wanted to move to Vienna, so we agreed on a fixed-term contract.
  `),

  section(),
  timeline({ from: '2017-12-01', to: '2018-07-30' }),

  section(),
  paragraph(`
  My main job was to develop a new customer-facing application for ordering music and videos (Java, Spring,
  Angular, PostgreSQL).
  I got a mockup and finished that full-stack project in about six months, occasionally requiring help
  from the database admins for query optimization. There was a lot of data! Outside of that, this was mostly a
  one-person job.
  `),
  paragraph(`
  In my last 6-8 weeks at UMG, I completely consolidated the style (LessCSS) of three standalone
  web applications into one library project, which was often monotonic, but I had a blast
  because I really like CSS.
  `),
] satisfies Content;

export const environment = {
  workRole: 'Software Engineer',
  at: 'Universal Music GmbH, Salzburg',
} satisfies CvEntryDetailsEnvironment;
