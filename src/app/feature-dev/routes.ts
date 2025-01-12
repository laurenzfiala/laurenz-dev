import { Routes } from '../util-router';
import { DevPage } from './dev.page';
import { ProjectPage } from './project/project.page';
import { MediaFullscreenComponent } from '../ui-media-fullscreen';

export function devRoutes(): Routes {
  return [
    {
      path: '',
      component: DevPage,
      title: 'laurenz · dev › Development',
      data: {
        pageId: 'dev',
        title: 'All projects',
      },
      children: [
        {
          path: ':id',
          component: ProjectPage,
          title: ProjectPage.pageTitle('laurenz · dev › Development › '),
          data: {
            pageId: 'project',
            parentPageId: 'dev',
            scrollOn: 'never',
            title: ProjectPage.pageTitle(),
          },
          children: [
            {
              path: 'media/:mediaId',
              component: MediaFullscreenComponent,
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
