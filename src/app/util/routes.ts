import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

/**
 * Gets the full path for the given activated route.
 *
 * @param route route to convert to an absolute path
 * @returns absolute path containing all path segments that describe the given route
 */
export function routePath(route: ActivatedRouteSnapshot | ActivatedRoute) {
  const routeSnapshot = route instanceof ActivatedRoute ? route.snapshot : route;

  return (
    '/' +
    routeSnapshot.pathFromRoot
      .filter((p) => p.url.length > 0)
      .map((p) => p.url.join('/'))
      .join('/')
  );
}
