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
import { ImprintComponent } from './pages/imprint/imprint.component';
import { ProjectComponent } from './components/project/project.component';
import { ApplicationLinkComponent } from './components/application-link/application-link.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { NgOptimizedImage } from '@angular/common';
import { UnfinishedComponent } from './components/unfinished/unfinished.component';
import { BackDirective } from './directives/back.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutPage,
    DevPage,
    PostsPage,
    CvPage,
    FooterComponent,
    ImprintComponent,
    ProjectComponent,
    ApplicationLinkComponent,
    TabsComponent,
    TabComponent,
    QrCodeComponent,
    UnfinishedComponent,
    BackDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
