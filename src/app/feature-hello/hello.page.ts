import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { sendMail } from '../util-contact';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hello',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './hello.page.html',
  styleUrl: './hello.page.css',
})
export class HelloPage {
  protected readonly sendMail = sendMail;
}
