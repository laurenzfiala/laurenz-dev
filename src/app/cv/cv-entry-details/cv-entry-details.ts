import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { ContentComponent } from '../../content';
import { Content } from '../../content';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Overlay } from '../../ui/overlay';

export interface CvEntryDetailsEnvironment {
  workRole: string;
  at: string;
}

@Component({
  selector: 'x-cv-entry-details',
  imports: [ContentComponent],
  templateUrl: './cv-entry-details.html',
  styleUrl: './cv-entry-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEntryDetails {
  readonly id = input.required<string>();

  protected readonly _environment = signal<CvEntryDetailsEnvironment | null>(null);
  protected readonly _content = signal<Content | null>(null);
  protected readonly _error = signal<Error | null>(null);

  protected readonly _overlay = inject(Overlay, { optional: true });

  protected readonly ContentComponent = ContentComponent;

  constructor() {
    console.log(this.ContentComponent);
    effect(() => {
      this.id();
      untracked(() => void this.load());
    });
  }

  protected close() {
    this._overlay?.close();
  }

  private async load() {
    try {
      const module = await CvEntryDetails.load(this.id());
      this._environment.set(module.environment);
      this._content.set(module.content);
    } catch (err) {
      this._error.set(
        new Error('There is no content for this CV entry yet, it will be added soon!', {
          cause: err,
        }),
      );
      console.error(err);
    }
  }

  private static async load(
    id: string,
  ): Promise<{ content: Content; environment: CvEntryDetailsEnvironment }> {
    const module = await import(`../../../content/cv/${id}.ts`);

    return {
      content: module.default,
      environment: module.environment,
    };
  }

  static pageTitle(prefix?: string): ResolveFn<string> {
    return async (route: ActivatedRouteSnapshot) => {
      let title: string;
      try {
        const environment = (await this.load(route.paramMap.get('id') ?? 'unknown')).environment;
        title = environment.at ?? '';
      } catch (e) {
        title = '(missing)';
      }

      return `${prefix ?? ''}${title}`;
    };
  }
}
