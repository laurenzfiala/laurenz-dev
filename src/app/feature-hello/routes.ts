import { HelloPage } from './hello.page';
import { Routes } from '../util-router';

export function helloRoutes(): Routes {
  return [
    {
      path: '',
      component: HelloPage,
      title: 'laurenz · dev',
      data: {
        pageId: 'hello',
        title: 'Hello',
        nav: false
      },
    },
  ];
}
