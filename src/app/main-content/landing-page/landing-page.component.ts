import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private translate: TranslateService, private router: Router) {}
  menuOpen = false;
  activeLang: string = 'en';
  currentIcon = 'assets/img/icons/burger-default.svg';

  goToSection(id: string): void {
    const isHome = this.router.url === '/' || this.router.url.startsWith('/#');
    this.menuOpen = false;
    this.animateToBurger();
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
      const yOffset = window.innerWidth <= 1080 ? 0 : -70;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (attempts > 0) {
      setTimeout(() => this.scrollToId(id, attempts - 1), 100);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  }

  toggleMenu(): void {
    if (!this.menuOpen) {
      this.animateToClose();
      this.menuOpen = true;
    } else {
      this.animateToBurger();
      this.menuOpen = false;
    }
  }

  animateToClose(): void {
    const frames = [
      'assets/img/icons/burger-opening.svg',
      'assets/img/icons/burger-closing.svg',
      'assets/img/icons/burger-close.svg',
    ];
    this.playIconFrames(frames);
  }

  animateToBurger(): void {
    const frames = [
      'assets/img/icons/burger-closing.svg',
      'assets/img/icons/burger-opening.svg',
      'assets/img/icons/burger-default.svg',
    ];
    this.playIconFrames(frames);
  }

  playIconFrames(frames: string[]): void {
    let i = 0;
    const interval = setInterval(() => {
      this.currentIcon = frames[i];
      i++;
      if (i === frames.length) {
        clearInterval(interval);
      }
    }, 70);
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
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize(): void {
    if (window.innerWidth >= 1080 && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
