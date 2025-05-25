import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
    WhyMeComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements AfterViewInit {
  @ViewChildren('fadeSection') sections!: QueryList<ElementRef>;

  private lastScrollTop = 0;
  private scrollDirection: 'up' | 'down' = 'down';

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.detectScrollDirection.bind(this));
    this.observeFadeSections();
  }

  private observeFadeSections(): void {
    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.2,
      }
    );
    this.sections.forEach((section) => observer.observe(section.nativeElement));
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;

      if (entry.isIntersecting && this.scrollDirection === 'down') {
        target.classList.add('visible');
      }
      if (!entry.isIntersecting && this.scrollDirection === 'up') {
        target.classList.remove('visible');
      }
    });
  }

  private detectScrollDirection(): void {
    const current = window.pageYOffset || document.documentElement.scrollTop;
    this.scrollDirection = current > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = Math.max(current, 0);
  }
}
