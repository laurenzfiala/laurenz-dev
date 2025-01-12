import { AboutPage } from './about.page';
import { Routes } from '../util-router';

export function aboutRoutes(): Routes {
  return [
    {
      path: '',
      component: AboutPage,
      title: 'laurenz · dev',
      data: {
        pageId: 'about',
        title: 'About',
      },
    },
  ];
}
