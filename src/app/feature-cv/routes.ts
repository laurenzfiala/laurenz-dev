import { Routes } from '../util-router';
import { CvPage } from './cv.page';
import { CvEntryDetailsComponent } from './cv-entry-details/cv-entry-details.component';

export function cvRoutes(): Routes {
  return [
    {
      path: '',
      component: CvPage,
      title: 'laurenz · dev › CV',
      data: {
        pageId: 'cv',
        title: 'CV',
      },
      children: [
        {
          path: ':id',
          component: CvEntryDetailsComponent,
          title: CvEntryDetailsComponent.pageTitle('laurenz · dev › CV › '),
          data: {
            scrollOn: 'never',
          },
        },
      ],
    },
  ];
}
