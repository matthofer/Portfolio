import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  activeTab = 'el-pollo';

  projects = [
    {
      id: 'el-pollo',
      title: '1. El Pollo Loco',
      description:
        'A classical Jump’n’Run game using JavaScript, OOP and Canvas. Help Pepe to find coins and salsa bottles to fight off the evil chickens',
      image: './assets/img/el-pollo-loco.png',
      duration: '5 weeks',
      solo: 'Through building El Pollo Loco, I deepened my understanding of object-oriented programming and game logic using JavaScript and HTML5 Canvas. It taught me how to structure a game engine, handle animations, collisions, and create a playable 2D game from scratch.',
      live: 'yes',
      technologies: [
        './assets/img/icons/html.svg',
        './assets/img/icons/javascript.svg',
        './assets/img/icons/css.svg',
      ],
    },
    {
      id: 'join',
      title: '2. Join',
      description:
        'Task manager inspired by the Kanban system. Create and organize tasks using drag and drop functions, assign users and categories',
      image: './assets/img/join.png',
      duration: '4 weeks',
      group:
        'We were a group of 3. My role was the login and signup pages as well as reusable components. We had a great work flow and team spirit was always up.',
      live: 'yes',
      technologies: [
        './assets/img/icons/html.svg',
        './assets/img/icons/javascript.svg',
        './assets/img/icons/css.svg',
        './assets/img/icons/firebase.svg',
      ],
    },
    {
      id: 'pokedex',
      title: '3. Pokedex',
      description:
        'A simple library that provides and catalogues pokemon information, based on the PokeAPI',
      image: './assets/img/pokedex.png',
      duration: '2 weeks',
      solo: 'This project taught me how to work with external APIs by integrating the PokeAPI to fetch and display dynamic data. It helped me improve my skills in asynchronous JavaScript, data filtering, and building interactive UI components.',
      live: 'yes',
      technologies: [
        './assets/img/icons/html.svg',
        './assets/img/icons/javascript.svg',
        './assets/img/icons/css.svg',
        './assets/img/icons/restapi.svg',
      ],
    },
    {
      id: 'ongoing',
      title: '4. Ongoing Project',
      description:
        'Slack Clone App - Messaging Tool for Businesses using Firebase and Angular.',
      image: './assets/img/ongoing.png',
      duration: 'pending',
      technologies: [
        './assets/img/icons/angular.svg',
        './assets/img/icons/typescript.svg',
        './assets/img/icons/css.svg',
        './assets/img/icons/firebase.svg',
      ],
    },
  ];

  setActiveTab(id: string): void {
    this.activeTab = id;
  }
}
