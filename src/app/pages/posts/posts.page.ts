import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPage {}
