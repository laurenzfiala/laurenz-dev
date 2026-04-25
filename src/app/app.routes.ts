import { HistoryService } from './util/back';
import { aboutRoutes } from './about';
import { Route } from './util/router';
import { devRoutes } from './dev';

import { cvRoutes } from './cv';

export const routes: Route[] = [
  {
    path: '',
    canActivateChild: [HistoryService.canActivateApplicationChild()],
    children: [
      ...aboutRoutes(),
      {
        path: 'development',
        children: devRoutes(),
      },
      {
        path: 'cv',
        children: cvRoutes(),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
