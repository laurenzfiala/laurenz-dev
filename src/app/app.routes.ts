import { HistoryService } from './util/back';
import { aboutRoutes } from './about';
import { Route } from './util/router';

export const routes: Route[] = [
  {
    path: '',
    canActivateChild: [HistoryService.canActivateApplicationChild()],
    children: [
      ...aboutRoutes(),
      /*
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
       */
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
