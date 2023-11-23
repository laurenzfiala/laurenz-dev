import {
  carousel,
  heading,
  mediaImage,
  paragraph,
  section,
  timeline,
} from '../../app/utils/content.utils';
import { Content } from '../../app/interfaces/content.interface';
import { ProjectPageEnvironment } from '../../app/pages/project/project.page';

export default [
  section(true),
  carousel(
    mediaImage('/assets/content/projects/ngx-visual-cd/1.jpg', ``),
    mediaImage('/assets/content/projects/ngx-visual-cd/2.jpg', ``),
  ),

  section(),
  heading(`ngx-visual-cd`),
  paragraph(`
  A simple Angular app that helps to understand the inner workings of the Angular
  change detector. It's supports »Default« and »OnPush« change detection modes and
  visualizes which components are being change detected.
  `),

  section(),
  heading(`Timeline`),
  timeline({ from: '2023-08-25', to: '2023-09-17' }),
  paragraph(`
  The project is currently on the backburner as long as this website is my priority.
  There are not many things left to do, but a few nice-to-haves could be added, like support
  for other layouts with different types of Angular units. For example pipes & directives. A
  few bugfixes might also be necessary.
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/assets/content/projects/ngx-visual-cd/bg.jpg', ''),
} satisfies ProjectPageEnvironment;
