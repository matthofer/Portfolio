import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skillIcons: string[] = [
    'angular-skill.svg',
    'typescript-skill.svg',
    'javascript-skill.svg',
    'html-skill.svg',
    'css-skill.svg',
    'restapi-skill.svg',
    'firebase-skill.svg',
    'git-skill.svg',
    'material-skill.svg',
    'scrum-skill.svg',
  ];

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
      const yOffset = window.innerWidth <= 1080 ? 0 : -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (attempts > 0) {
      setTimeout(() => this.scrollToId(id, attempts - 1), 100);
    }
  }
}
