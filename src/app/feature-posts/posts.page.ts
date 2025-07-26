import { Component } from '@angular/core';
import { UnfinishedComponent } from '../ui-unfinished';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  imports: [UnfinishedComponent],
})
export class PostsPage {}
