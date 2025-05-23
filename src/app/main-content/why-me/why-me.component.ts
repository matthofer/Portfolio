import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss',
})
export class WhyMeComponent {
  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      const isWideScreen = window.innerWidth <= 1080;
      const yOffset = isWideScreen ? 20 : -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
