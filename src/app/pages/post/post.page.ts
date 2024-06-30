import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from "@angular/core";
import { Content } from "../../interfaces/content.interface";
import { ComponentChanges } from "../../interfaces/component-changes.interface";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { bug } from "../../utils/error.util";
import { firstHeading } from "../../utils/content.utils";
import { ContentComponent } from "../../components/content/content.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ContentComponent],
  templateUrl: './post.page.html',
  styleUrl: './post.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage implements OnInit, OnChanges {
  @Input({ required: true }) id!: string;

  protected _content?: Content;
  protected _error?: Error;

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    void this.load();
  }

  ngOnChanges(changes: ComponentChanges<PostPage>) {
    if (changes.id && !changes.id.firstChange) {
      void this.load();
    }
  }

  private async load() {
    try {
      const module = await PostPage.load(this.id);
      this._content = module.content;
    } catch (err) {
      this._error = new Error("We coudln't load this article", {
        cause: err,
      });
      console.error(err);
    } finally {
      this._cdRef.markForCheck();
    }
  }

  private static async load(id: string): Promise<{ content: Content }> {
    const module = await import(`../../../content/posts/${id}.ts`);

    return {
      content: module.default,
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
