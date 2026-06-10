import { Routes } from '@angular/router';

export const peopleRoutes: Routes = [
  {
    path: 'form/naturalPerson',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
  },
  {
    path: 'form/legalPerson',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
  },
];
