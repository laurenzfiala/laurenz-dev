import { paragraph, section, timeline } from '../../app/feature-content';
import { Content } from '../../app/feature-content';
import { CvEntryDetailsEnvironment } from '../../app/feature-cv/cv-entry-details/cv-entry-details.component';

export default [
  section(),
  paragraph(`
  During my three-and-a-half years at Sony DADC, I learned to write Java Desktop applications,
  JSP-based web applications and data visualisation, web applications with Google Web Toolkit and
  Grails. Later I also worked on projects with Spring, Groovy and Oracle DB, before delving into
  Angular (starting with 2.0.0-beta.6) during the last year.
  `),

  section(),
  timeline({ from: '2013-08-01', to: '2017-01-31' }),
] satisfies Content;

export const environment = {
  workRole: 'Apprenticeship: IT - Software Engineering',
  at: 'Sony DADC Austria GmbH, Salzburg',
} satisfies CvEntryDetailsEnvironment;
