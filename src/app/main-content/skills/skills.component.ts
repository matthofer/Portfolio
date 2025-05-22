import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
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
