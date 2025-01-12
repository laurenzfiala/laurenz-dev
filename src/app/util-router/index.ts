import { ResolveFn, Route as NgRoute } from '@angular/router';
import { RouteScrollConfig } from '../util-interaction/scroll.service';

export type Routes = Route[];

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

  /**
   * By default, we scroll to the top when a navigation occurs.
   * You can choose to skip scrolling on route activation and/or
   * deactivation.
   * When the current route and the new route both have conflicting
   * configs, the deactivated route config takes precedence.
   */
  scrollOn?: RouteScrollConfig;
}
