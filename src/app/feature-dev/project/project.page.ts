import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  input,
  untracked,
} from '@angular/core';
import { Content, ContentComponent } from '../../feature-content';
import { ActivatedRouteSnapshot, ResolveFn, RouterOutlet } from '@angular/router';
import { firstHeading } from '../../feature-content';
import { Media, MediaService } from '../../ui-media-fullscreen';
import { NgStyle } from '@angular/common';
import { bug } from '../../util-error';

export interface ProjectPageEnvironment {
  topBg: Media;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MediaService],
  imports: [NgStyle, ContentComponent, RouterOutlet],
})
export class ProjectPage {
  id = input.required<string>();

  protected _environment?: ProjectPageEnvironment;
  protected _content?: Content;
  protected _error?: Error;

  constructor(private _cdRef: ChangeDetectorRef) {
    effect(() => {
      this.id();
      void untracked(() => this.load());
    });
  }

  private async load() {
    try {
      const module = await ProjectPage.load(this.id());
      this._content = module.content;
      this._environment = module.environment;
    } catch (err) {
      this._error = new Error('There is no content for this project yet, it will be added soon!', {
        cause: err,
      });
      console.error(err);
    } finally {
      this._cdRef.markForCheck();
    }
  }

  private static async load(
    id: string,
  ): Promise<{ content: Content; environment: ProjectPageEnvironment }> {
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
      } catch (e) {
        title = '(missing)';
      }

      return `${prefix ?? ''}${title}`;
    };
  }
}
