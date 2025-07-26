import {
  Content,
  heading,
  mediaImage,
  paragraph,
  section,
  timeline,
} from '../../app/feature-content';
import { ProjectPageEnvironment } from '../../app/feature-dev/project/project.page';

export default [
  section(),
  heading(`Mental Health Checker`),
  paragraph(`
  Group project with 5 other team members completed as part of a TU Wien course on Software Engineering and Project Management (SEPM).
  `),

  section(),
  section(),
  timeline({ from: '2022-03', to: '2022-06' }),
  paragraph(`
  The web app provides a questionnaire that is based on the medical reference work "DSM-5"
  and aims to enable users to check themselves for indications of common mental disorders,
  as well as continuous monitoring of mental state.
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/content/projects/tuw-mental-health-checker/bg.webp', ''),
} satisfies ProjectPageEnvironment;
