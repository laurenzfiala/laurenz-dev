import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutPage } from './pages/about/about.page';
import { DevPage } from './pages/dev/dev.page';
import { PostsPage } from './pages/posts/posts.page';
import { CvPage } from './pages/cv/cv.page';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectLinkComponent } from './components/project-link/project-link.component';
import { ApplicationLinkComponent } from './components/application-link/application-link.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { NgOptimizedImage } from '@angular/common';
import { UnfinishedComponent } from './components/unfinished/unfinished.component';
import { ProjectPage } from './pages/project/project.page';
import { BackDirective } from './directives/back.directive';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MediaFullscreenComponent } from './components/media-fullscreen/media-fullscreen.component';
import { ClickA11yDirective } from './directives/click-a11y.directive';
import { FilenamePipe } from './pipes/filename.pipe';
import { ContentComponent } from './components/content/content.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { HeadingComponent } from './components/heading/heading.component';
import { FileComponent } from './components/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutPage,
    DevPage,
    PostsPage,
    CvPage,
    FooterComponent,
    ProjectLinkComponent,
    ApplicationLinkComponent,
    TabsComponent,
    TabComponent,
    QrCodeComponent,
    UnfinishedComponent,
    ProjectPage,
    BackDirective,
    TimelineComponent,
    CarouselComponent,
    MediaFullscreenComponent,
    ClickA11yDirective,
    FilenamePipe,
    ContentComponent,
    ScrollComponent,
    HeadingComponent,
    FileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
