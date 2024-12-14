import { heading, paragraph, section, subheading, timeline } from '../../app/utils/content.utils';
import { Content } from '../../app/interfaces/content.interface';
import { CvEntryDetailsEnvironment } from '../../app/components/cv-entry-details/cv-entry-details.component';

export default [
  section(),
  paragraph(`
  This was contract work for two different citizen science projects during which I developed
  a web-app (Java, Spring, Angular, PostgreSQL) and an Android app with Bluetooth functionality.
  `),

  section(),
  timeline({ from: '2017-12', to: '2023-05' }),

  section(),
  paragraph(`
  The app was used by the many project participants to record the process of leaves changing color in autumn.
  It was also possible to read out Bluetooth beacons using the Android companion app.
  `),
  paragraph(`
  Another big part of these projects was the need for an extensive array of admin functionality,
  using which the project team could manage the data, user roles, enter new trees and beacons and
  make announcements.
  `),

  section(),
  subheading(`Content Management System (CMS)`),
  paragraph(`
  Most of my time working in 2021 was spent designing and implementing a CMS, which proved
  to be a though task. I got it working eventually, with many lessons learned - especially on
  systems design, time management and planning. But I also learned a lot of intricacies of Angular
  in those days.
  `),
] satisfies Content;

export const environment = {
  workRole: 'Full-Stack Software Engineer',
  at: 'University of Salzburg (PLUS), Salzburg',
} satisfies CvEntryDetailsEnvironment;
