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

export default [
  paragraph(
    `Quia sapiente non ipsa reprehenderit. Esse minima non tenetur incidunt ducimus corrupti. Consequatur ea assumenda alias ut dignissimos nam. Qui numquam quaerat nobis alias non voluptas quo autem. Ut perferendis ab et.`,
  ),
  paragraph(
    `Et distinctio et tenetur ut consequatur asperiores. Et rerum perferendis aut tempore nihil perferendis provident. Eveniet eveniet vel voluptate neque. Nisi quia ullam delectus. Excepturi voluptatem dolorem beatae. Necessitatibus voluptatem laborum doloremque.`,
  ),
  section(),
  subheading(`Heading`),
  paragraph(
    `Velit voluptate quod qui cumque sint rerum. Possimus distinctio et magni sint molestias fugiat. Est dicta voluptas ex hic quibusdam. Rerum consequuntur illum eius necessitatibus.`,
  ),
  paragraph(
    `Labore ullam placeat officia fugiat magni. Unde aliquam pariatur est aliquam ut doloribus distinctio debitis. Rerum omnis ratione consequatur quae consequatur beatae. Tenetur delectus ut velit quam voluptas provident. Quisquam ea et soluta quas consectetur hic ipsam. Quibusdam aut eaque delectus consequatur voluptas quidem molestias.`,
  ),
  paragraph(
    `Quae et expedita quam debitis iure eligendi. Saepe voluptatem autem tempora sit. Dicta corrupti laboriosam aspernatur.`,
  ),
  section(),
  subheading(`Heading`),
  paragraph(
    `Velit voluptate quod qui cumque sint rerum. Possimus distinctio et magni sint molestias fugiat. Est dicta voluptas ex hic quibusdam. Rerum consequuntur illum eius necessitatibus.`,
  ),
  paragraph(
    `Labore ullam placeat officia fugiat magni. Unde aliquam pariatur est aliquam ut doloribus distinctio debitis. Rerum omnis ratione consequatur quae consequatur beatae. Tenetur delectus ut velit quam voluptas provident. Quisquam ea et soluta quas consectetur hic ipsam. Quibusdam aut eaque delectus consequatur voluptas quidem molestias.`,
  ),
  paragraph(
    `Quae et expedita quam debitis iure eligendi. Saepe voluptatem autem tempora sit. Dicta corrupti laboriosam aspernatur.`,
  ),
] satisfies Content;

export const environment = {
  color: '176 81 251',
  heading: 'Web Development',
  date: new Date('2024-07-02'),
} satisfies PostPageEnvironment;
