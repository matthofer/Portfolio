import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {}
  activeSection: string = '';
  activeLang: string = 'en';

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sectionIds = ['why-me', 'skills', 'projects', 'contact'];
    const current = this.findActiveSection(sectionIds);
    this.activeSection = current ?? '';
  }

  findActiveSection(ids: string[]): string | null {
    for (let id of ids) {
      const el = document.getElementById(id);
      if (el && this.isElementInView(el)) return id;
    }
    return null;
  }

  isElementInView(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top <= 150 && rect.bottom >= 150;
  }

  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (!target) return;

    const yOffset = this.getYOffset();
    const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  getYOffset(): number {
    return window.innerWidth <= 1080 ? 20 : -70;
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setLanguage(lang: string) {
    this.activeLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
    this.activeLang = savedLang;
  }
}
