import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnfinishedComponent } from '../../components/unfinished/unfinished.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UnfinishedComponent],
})
export class PostsPage {}
