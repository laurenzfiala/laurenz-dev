import { NgModule } from '@angular/core';
import { ResolveFn, Route as NgRoute, RouterModule } from '@angular/router';
import { AboutPage } from './pages/about/about.page';
import { DevPage } from './pages/dev/dev.page';
import { PostsPage } from './pages/posts/posts.page';
import { CvPage } from './pages/cv/cv.page';
import { ProjectPage } from './pages/project/project.page';
import { MediaFullscreenComponent } from './components/media-fullscreen/media-fullscreen.component';
import { HistoryService } from './services/history.service';

export interface Route extends NgRoute {
  data?: RouteData;
  children?: Route[];
}

export interface RouteData {
  /**
   * String ID of this page, used by child pages
   * that reference their parent page.
   * @see parentPageId
   */
  pageId?: string;

  /**
   * Page ID of the parent page.
   * @see pageId
   */
  parentPageId?: string;

  /**
   * Set false to hide the navigation on that page.
   * By default, all pages show a navigation component
   * at the top.
   */
  nav?: boolean;

  /**
   * A title that describes a given page well.
   * Should be very short.\
   * It's also possible to use a resolver function.\
   * If this is omitted, the parent titles are inherited.
   *
   * In contrast to `Route.title`, this is **not** the tab title, but the shortest
   * possible title, to be used by e.g. back.directive.
   */
  title?: string | ResolveFn<string>;
}

const routes: Route[] = [
  {
    path: '',
    canActivateChild: [HistoryService.canActivateApplicationChild()],
    children: [
      {
        path: 'about',
        component: AboutPage,
        title: 'laurenz · dev › About',
        data: {
          pageId: 'about',
          title: 'About',
        },
      },
      {
        path: '',
        component: DevPage,
        title: 'laurenz · dev',
        data: {
          pageId: 'dev',
          title: 'All projects',
        },
      },
      {
        path: 'posts',
        component: PostsPage,
        title: 'laurenz · dev › Posts',
        data: {
          pageId: 'posts',
          title: 'Posts',
        },
      },
      {
        path: 'cv',
        component: CvPage,
        title: 'laurenz · dev › CV',
        data: {
          pageId: 'cv',
          title: 'CV',
        },
      },
      {
        path: 'projects/:id',
        component: ProjectPage,
        title: ProjectPage.pageTitle('laurenz · dev › Projects › '),
        data: {
          pageId: 'project',
          parentPageId: 'dev',
          nav: false,
          title: ProjectPage.pageTitle(),
        },
        children: [
          {
            path: 'media/:mediaId',
            component: MediaFullscreenComponent,
            data: {
              nav: false,
            },
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
