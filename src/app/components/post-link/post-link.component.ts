import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-post-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-link.component.html',
  styleUrl: './post-link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostLinkComponent {}
