import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
