import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { Content } from '../../interfaces/content.interface';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { bug } from '../../utils/error.util';
import { firstHeading } from '../../utils/content.utils';
import { ContentComponent } from '../../components/content/content.component';
import { BackDirective } from '../../directives/back.directive';
import { DatePipe, NgStyle } from '@angular/common';

export interface PostPageEnvironment {
  heading: string;
  date: Date;
  color: `${number} ${number} ${number}`;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ContentComponent, BackDirective, NgStyle, DatePipe],
  templateUrl: './post.page.html',
  styleUrl: './post.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage {
  id = input.required<string>();

  protected _environment = signal<PostPageEnvironment | null>(null);
  protected _content = signal<Content | null>(null);
  protected _error = signal<Error | null>(null);

  constructor(private _cdRef: ChangeDetectorRef) {
    effect(() => {
      this.id();
      untracked(() => void this.load());
    });
  }

  private async load() {
    try {
      const module = await PostPage.load(this.id());
      this._content.set(module.content);
      this._environment.set(module.environment);
    } catch (err) {
      this._error.set(
        new Error("We couldn't load this article", {
          cause: err,
        }),
      );
      console.error(err);
    } finally {
      this._cdRef.markForCheck();
    }
  }

  private static async load(
    id: string,
  ): Promise<{ content: Content; environment: PostPageEnvironment }> {
    const module = await import(`../../../content/posts/${id}.ts`);

    return {
      content: module.default,
      environment: module.environment,
    };
  }

  static pageTitle(prefix?: string): ResolveFn<string> {
    return async (route: ActivatedRouteSnapshot) => {
      let title: string;
      try {
        const content = await this.load(route.paramMap.get('id') ?? bug());
        title = content.environment.heading ?? '';
      } catch (e) {
        title = '(missing)';
      }

      return `${prefix ?? ''}${title}`;
    };
  }
}
