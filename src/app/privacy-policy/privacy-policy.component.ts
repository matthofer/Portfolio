import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  constructor(private translate: TranslateService) {}
  email = 'contact@matthias-hofer.com';
  activeLang: string = 'en';
  menuOpen = false;
  currentIcon = 'assets/img/icons/burger-default.svg';

  setLanguage(lang: string) {
    this.activeLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
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
}
