import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from '../shared/header/header.component';
import { WhyMeComponent } from './why-me/why-me.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
    HeaderComponent,
    WhyMeComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
