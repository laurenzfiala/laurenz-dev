import { Routes } from '../util-router';
import { PostsPage } from './posts.page';

export function postsRoutes(): Routes {
  return [
    {
      path: '',
      component: PostsPage,
      title: 'laurenz · dev › Posts',
      data: {
        pageId: 'posts',
        title: 'Posts',
      },
    },
  ];
}
