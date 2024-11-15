import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostLinkComponent } from '../../components/post-link/post-link.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, PostLinkComponent],
})
export class PostsPage {}
