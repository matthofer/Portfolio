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
}
