import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPage } from './pages/about/about.page';
import { DevPage } from './pages/dev/dev.page';
import { PostsPage } from './pages/posts/posts.page';
import { CvPage } from './pages/cv/cv.page';

const routes: Routes = [
  {
    path: 'about',
    component: AboutPage,
  },
  {
    path: '',
    component: DevPage,
  },
  {
    path: 'posts',
    component: PostsPage,
  },
  {
    path: 'cv',
    component: CvPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
