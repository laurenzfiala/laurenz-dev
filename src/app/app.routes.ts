import { HistoryService } from './util-back';
import { Route } from './util-router';
import { aboutRoutes } from './feature-about';
import { devRoutes } from './feature-dev';
import { cvRoutes } from './feature-cv';
import { postsRoutes } from './feature-posts';
import { helloRoutes } from './feature-hello';

export const Routes: Route[] = [
  {
    path: '',
    canActivateChild: [HistoryService.canActivateApplicationChild()],
    children: [
      ...aboutRoutes(),
      {
        path: 'hello',
        children: helloRoutes(),
      },
      {
        path: 'development',
        children: devRoutes(),
      },
      {
        path: 'cv',
        children: cvRoutes(),
      },
      {
        path: 'posts',
        children: postsRoutes(),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
