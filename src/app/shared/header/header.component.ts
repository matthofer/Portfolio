import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeSection: string = '';

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sectionIds = ['why-me', 'skills', 'projects', 'contact'];
    let found = false;

    for (let id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        this.activeSection = id;
        found = true;
        break;
      }
    }
    if (!found) {
      this.activeSection = '';
    }
  }

  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      const isWideScreen = window.innerWidth <= 1080;
      const yOffset = isWideScreen ? 20 : -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  activeLang: string = 'en';

  setLanguage(lang: string): void {
    this.activeLang = lang;
  }
}
