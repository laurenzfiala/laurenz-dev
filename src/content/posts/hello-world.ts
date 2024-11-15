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
import { PostPageEnvironment } from '../../app/pages/post/post.page';

export default [paragraph(`Lets goooo`)] satisfies Content;

export const environment = {
  color: '95 15 64',
  heading: 'Hello World!',
  date: new Date('2024-07-10'),
} satisfies PostPageEnvironment;
