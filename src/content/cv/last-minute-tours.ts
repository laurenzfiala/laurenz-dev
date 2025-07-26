import { Content, paragraph, section, timeline } from '../../app/feature-content';
import { CvEntryDetailsEnvironment } from '../../app/feature-cv/cv-entry-details/cv-entry-details.component';

export default [
  section(),
  paragraph(`
  Last Minute Tours marks the first time I am working on a proper consumer-facing web-application.
  The tech stack is much thicker than in any of my previous jobs, which is quite interesting to see.
  I hope to gain some more real-world experience in how different technologies, tools, patterns
  and project management approaches work in a larger team and what the trade-offs are.
  `),

  section(),
  paragraph(`
  Tech/Tools used: Vue, Typescript, JavaScript, Storybook, SCSS, Playwright, Jest, Typo3.
  `),

  section(),
  timeline({ from: '2025-04-15', to: 'ongoing' }),
] satisfies Content;

export const environment = {
  workRole: 'Senior Frontend Developer',
  at: 'Last Minute Tours GmbH, Vienna',
} satisfies CvEntryDetailsEnvironment;
