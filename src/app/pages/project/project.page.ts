import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Content } from '../../interfaces/content.interface';
import { ActivatedRouteSnapshot, ResolveFn, RouterOutlet } from '@angular/router';
import { bug } from '../../utils/error.util';
import { firstHeading } from '../../utils/content.utils';
import { ComponentChanges } from '../../interfaces/component-changes.interface';
import { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';
import { ContentComponent } from '../../components/content/content.component';
import { BackDirective } from '../../directives/back.directive';
import { NgStyle } from '@angular/common';

export interface ProjectPageEnvironment {
  topBg: Media;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MediaService],
  standalone: true,
  imports: [NgStyle, BackDirective, ContentComponent, RouterOutlet],
})
export class ProjectPage implements OnInit, OnChanges {
  @Input({ required: true }) id!: string;

  protected _environment?: ProjectPageEnvironment;
  protected _content?: Content;
  protected _error?: Error;

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    void this.load();
  }

  ngOnChanges(changes: ComponentChanges<ProjectPage>) {
    if (changes.id && !changes.id.firstChange) {
      void this.load();
    }
  }

  private async load() {
    try {
      const module = await ProjectPage.load(this.id);
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
