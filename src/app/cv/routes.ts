import { Routes } from '../util/router';
import { Cv } from './cv';
import { CvEntryDetails } from './cv-entry-details/cv-entry-details';

export function cvRoutes(): Routes {
  return [
    {
      path: '',
      component: Cv,
      title: 'laurenz · dev › CV',
      data: {
        pageId: 'cv',
        title: 'CV',
      },
      children: [
        {
          path: ':id',
          component: CvEntryDetails,
          title: CvEntryDetails.pageTitle('laurenz · dev › CV › '),
          data: {
            scrollOn: 'never',
          },
        },
      ],
    },
  ];
}
