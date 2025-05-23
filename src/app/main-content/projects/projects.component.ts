import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  activeTab = 'el-pollo';
  isSmallScreen = window.innerWidth <= 1080;
  isVerySmallScreen = window.innerWidth <= 530;

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 1080;
    this.isVerySmallScreen = window.innerWidth <= 530;
  }

  projects = [
    {
      id: 'el-pollo',
      path: '/ElPolloLoco',
      number: '1. ',
      titleKey: 'projects.elPollo.title',
      descriptionKey: 'projects.elPollo.description',
      soloKey: 'projects.elPollo.solo',
      image: './assets/img/el-pollo-loco.png',
      duration: '5',
      live: 'yes',
      technologies: [
        './assets/img/icons/html.svg',
        './assets/img/icons/javascript.svg',
        './assets/img/icons/css.svg',
      ],
      technologiesText: ['HTML', ' JavaScript', ' CSS'],
      github: 'https://github.com/matthofer/El-Pollo-Loco',
    },
    {
      id: 'join',
      path: '/JOIN/login.html',
      number: '2. ',
      titleKey: 'projects.join.title',
      descriptionKey: 'projects.join.description',
      groupKey: 'projects.join.group',
      image: './assets/img/join.png',
      duration: '4',
      live: 'yes',
      technologies: [
        './assets/img/icons/html.svg',
        './assets/img/icons/javascript.svg',
        './assets/img/icons/css.svg',
        './assets/img/icons/firebase.svg',
      ],
      technologiesText: ['HTML', ' JavaScript', ' CSS', ' Firebase'],
      github: 'https://github.com/matthofer/JOIN',
    },
    {
      id: 'pokedex',
      path: '/PokeDex',
      number: '3. ',
      titleKey: 'projects.pokedex.title',
      descriptionKey: 'projects.pokedex.description',
      soloKey: 'projects.pokedex.solo',
      image: './assets/img/pokedex.png',
      duration: '2',
      live: 'yes',
      technologies: [
        './assets/img/icons/html.svg',
        './assets/img/icons/javascript.svg',
        './assets/img/icons/css.svg',
        './assets/img/icons/restapi.svg',
      ],
      technologiesText: ['HTML', ' JavaScript', ' CSS', ' RestAPI'],
      github: 'https://github.com/matthofer/Pokedex',
    },
    {
      id: 'ongoing',
      number: '4. ',
      titleKey: 'projects.ongoing.title',
      descriptionKey: 'projects.ongoing.description',
      image: './assets/img/ongoing.png',
      live: '',
      technologies: [
        './assets/img/icons/angular.svg',
        './assets/img/icons/typescript.svg',
        './assets/img/icons/css.svg',
        './assets/img/icons/firebase.svg',
      ],
      technologiesText: ['Angular', ' TypeScript', ' SCSS', ' Firebase'],
    },
  ];

  setActiveTab(id: string): void {
    this.activeTab = id;
  }
}
