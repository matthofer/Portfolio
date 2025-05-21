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
}
