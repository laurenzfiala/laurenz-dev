import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { Content, ContentComponent, firstHeading } from '../../content';
import { ActivatedRouteSnapshot, ResolveFn, RouterOutlet } from '@angular/router';
import { Media, MediaService } from '../../ui/media-fullscreen';
import { bug } from '../../util/error';

export interface ProjectEnvironment {
  topBg: Media;
}

@Component({
  selector: 'x-project',
  templateUrl: './project.html',
  styleUrls: ['./project.scss'],
  providers: [MediaService],
  imports: [ContentComponent, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Project {
  readonly id = input.required<string>();

  protected _environment = signal<ProjectEnvironment | undefined>(undefined);
  protected _content = signal<Content | undefined>(undefined);
  protected _error = signal<Error | undefined>(undefined);

  protected _topBgStyle = computed(() => {
    const env = this._environment();
    return env ? `--bg-src: url('${env.topBg.src}')` : '';
  });

  constructor() {
    effect(() => {
      const currentId = this.id();
      void untracked(() => this.load(currentId));
    });
  }

  private async load(id: string) {
    try {
      const module = await Project.load(id);
      this._content.set(module.content);
      this._environment.set(module.environment);
      this._error.set(undefined);
    } catch (err) {
      this._error.set(
        new Error('There is no content for this project yet, it will be added soon!', {
          cause: err,
        }),
      );
      console.error(err);
    }
  }

  private static async load(
    id: string,
  ): Promise<{ content: Content; environment: ProjectEnvironment }> {
    const module = await import(`../../../content/projects/${id}.ts`);

    return {
      content: module.default,
      environment: module.environment,
    };
  }

  static pageTitle(prefix?: string): ResolveFn<string> {
    return async (route: ActivatedRouteSnapshot) => {
      let title: string;
      try {
        const content = (await this.load(route.paramMap.get('id') ?? bug())).content;
        title = firstHeading(content)?.text ?? '';
      } catch {
        title = '(missing)';
      }

      return `${prefix ?? ''}${title}`;
    };
  }
}
