import { Content, paragraph, section, timeline } from '../../app/feature-content';
import { CvEntryDetailsEnvironment } from '../../app/feature-cv/cv-entry-details/cv-entry-details.component';

export default [
  section(),
  paragraph(`
  As part of a very small team, my main job was to mentor other team members, design and develop
  two business applications and a consumer app.
  `),

  section(),
  timeline({ from: '2022-10-01', to: '2025-02-28' }),

  section(),
  paragraph(`
  I also helped transform our planning methodology to SCRUM and had the role of SCRUM master
  for almost two years.
  `),
  paragraph(`
  Most important to me, I also established a user-centered design philosophy,
  and planned and lead UX tests.
  `),
] satisfies Content;

export const environment = {
  workRole: 'Senior Angular Frontend Developer',
  at: 'Care Development GmbH, Vienna',
} satisfies CvEntryDetailsEnvironment;
