import { Component, HostListener, inject } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  activeLang: string = 'en';
  activeSection: string = '';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
    this.activeLang = savedLang;
  }

  navigateToSection(id: string): void {
    const isHome = this.router.url === '/' || this.router.url.startsWith('/#');

    if (isHome) {
      this.scrollToId(id);
    } else {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(() => this.scrollToId(id), 50);
      });
    }
  }

  private scrollToId(id: string, attempts = 10): void {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = this.getYOffset();
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (attempts > 0) {
      setTimeout(() => this.scrollToId(id, attempts - 1), 100);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sectionIds = ['landing', 'why-me', 'skills', 'projects', 'contact'];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && this.isElementInView(el)) {
        this.activeSection = id;
        break;
      }
    }
  }

  isElementInView(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const elementHeight = rect.height;
    const visibleHeight =
      Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
    return visibleHeight / elementHeight >= 0.5;
  }

  getYOffset(): number {
    return window.innerWidth <= 1080 ? 20 : -70;
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activeSection = '';
  }

  setLanguage(lang: string) {
    this.activeLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
