import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  menuOpen = false;

  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      const isSmallScreen = window.innerWidth <= 1080;
      const yOffset = isSmallScreen ? 20 : -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    this.toggleMenu();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  activeLang: string = 'en';

  setLanguage(lang: string): void {
    this.activeLang = lang;
  }
}
