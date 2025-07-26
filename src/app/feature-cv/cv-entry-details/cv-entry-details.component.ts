import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { Content, ContentComponent } from '../../feature-content';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Overlay } from '../../ui-overlay';
import { bug } from '../../util-error';

export interface CvEntryDetailsEnvironment {
  workRole: string;
  at: string;
}

@Component({
  selector: 'app-cv-entry-details',
  imports: [ContentComponent],
  templateUrl: './cv-entry-details.component.html',
  styleUrl: './cv-entry-details.component.css',
})
export class CvEntryDetailsComponent {
  readonly id = input.required<string>();

  protected readonly _environment = signal<CvEntryDetailsEnvironment | null>(null);
  protected readonly _content = signal<Content | null>(null);
  protected readonly _error = signal<Error | null>(null);

  protected readonly _overlay = inject(Overlay, { optional: true });

  constructor() {
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
      const module = await CvEntryDetailsComponent.load(this.id());
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
        const environment = (await this.load(route.paramMap.get('id') ?? bug())).environment;
        title = environment.at ?? '';
      } catch (e) {
        title = '(missing)';
      }

      return `${prefix ?? ''}${title}`;
    };
  }
}
