import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private translate: TranslateService) {}
  menuOpen = false;
  activeLang: string = 'en';
  currentIcon = 'assets/img/icons/burger-default.svg';

  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      const isSmallScreen = window.innerWidth <= 1080;
      const yOffset = isSmallScreen ? 20 : -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    this.menuOpen = false;
    this.animateToBurger();
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
