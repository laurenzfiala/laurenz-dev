import {
  carousel,
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
  section(true),
  carousel(
    mediaImage(
      '/content/projects/tobiaskropp-at/1.webp',
      `
      Website with a black-and-gray logo at the top and some cyber-punk drawings in a carousel at the bottom.
      `,
    ),
    mediaImage(
      '/content/projects/tobiaskropp-at/2.webp',
      `
      Website with a black-and-gray logo at the top and some cyber-punk drawings in a carousel at the bottom.
      `,
    ),
    mediaImage(
      '/content/projects/tobiaskropp-at/3.webp',
      `
      Full-size view of one of the drawings on the web site with previous and next arrows and a close button.
      `,
    ),
    mediaImage(
      '/content/projects/tobiaskropp-at/4.webp',
      `
      The 'Buy prints' section of the website where a picture and print size can be selected.
      `,
    ),
    mediaImage(
      '/content/projects/tobiaskropp-at/5.webp',
      `
      The 'Buy prints' section of the website with a drawing in the shopping basket. The basket is
      shown on the right, like a receipt.
      `,
    ),
  ),
  section(),
  heading(`tobiaskropp.at`),
  paragraph(`
  A freelance website project mainly focused on webdesign.
  `),

  section(),
  section(),
  timeline({ from: '2019-09-01', to: '2020-02-16' }),
  paragraph(`
  For this project, I implemented two designs. The earlier one was too complicated, so I changed it to
  something very simple, so the site does not compete for attention with the art.
  `),
  paragraph(`
  The client had a requirement to have his site hosted on a specific web hoster with very limited
  support for my usual stack, so I developed this in plain HTML/JS/CSS and some simple PHP for orders.
  `),
] satisfies Content;

export const environment = {
  topBg: mediaImage('/content/projects/tobiaskropp-at/bg.webp', ''),
} satisfies ProjectPageEnvironment;
