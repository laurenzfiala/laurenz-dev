import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnfinishedComponent } from '../ui-unfinished';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UnfinishedComponent],
})
export class PostsPage {}
