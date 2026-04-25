import { Routes } from '../util/router';
import { Dev } from './dev';
import { Project } from './project/project';
import { MediaFullscreen } from '../ui/media-fullscreen';

export function devRoutes(): Routes {
  return [
    {
      path: '',
      component: Dev,
      title: 'laurenz · dev › Development',
      data: {
        pageId: 'dev',
        title: 'All projects',
      },
      children: [
        {
          path: ':id',
          component: Project,
          title: Project.pageTitle('laurenz · dev › Development › '),
          data: {
            pageId: 'project',
            parentPageId: 'dev',
            scrollOn: 'never',
            title: Project.pageTitle(),
          },
          children: [
            {
              path: 'media/:mediaId',
              component: MediaFullscreen,
              data: {
                scrollOn: 'never',
              },
            },
          ],
        },
      ],
    },
  ];
}
