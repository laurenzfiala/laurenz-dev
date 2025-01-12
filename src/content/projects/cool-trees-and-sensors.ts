import {
  heading,
  mediaImage,
  paragraph,
  section,
  subheading,
  timeline,
} from '../../app/utils/content.utils';
import { Content } from '../../app/interfaces/content.interface';
import { ProjectPageEnvironment } from '../../app/pages/project/project.page';

export default [
  section(),
  heading(`Cool Trees and Sensors`),
  paragraph(`
  Continuation of the 'Urban Trees' webapp with a custom CMS.
  `),

  section(),
  section(),
  timeline({ from: '2019-09', to: '2023-05' }),
  paragraph(`
  Some time was spent creating a landing page and updating the
  pre-existing functionality, but I was working mostly on a custom content
  management system with permissions (2020 and 2021).
  `),
  paragraph(`
  I struggled to define a appropriate scope, so the it took much longer to complete than necessary.
  `),

  section(),
  paragraph(`
  The result was a pretty cool CMS with customizable approvals, a drag-and-drop UI, history
  and auto-saves.
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/content/projects/cool-trees-and-sensors/bg.webp', ''),
} satisfies ProjectPageEnvironment;
