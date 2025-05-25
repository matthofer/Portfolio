import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss',
})
export class WhyMeComponent {
  constructor(private router: Router) {}

  goToSection(id: string): void {
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
      const yOffset = window.innerWidth <= 1080 ? 20 : -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (attempts > 0) {
      setTimeout(() => this.scrollToId(id, attempts - 1), 100);
    }
  }
}
