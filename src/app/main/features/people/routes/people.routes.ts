import { Routes } from '@angular/router';
import { peopleDataResolverList } from './people-data-resolver-list.routes';
import { peopleDataResolverForm } from './people-data-resolver-form.routes';

export const peopleRoutes: Routes = [
  {
    path: 'form/naturalPerson',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
  },
  {
    path: 'form/legalPerson',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
  },
  {
    path: 'list/naturalPerson',
    loadComponent: () => import('../people-list/people-list').then((m) => m.PeopleList),
    resolve: {
      data: peopleDataResolverList,
    },
  },
  {
    path: 'list/legalPerson',
    loadComponent: () => import('../people-list/people-list').then((m) => m.PeopleList),
    resolve: {
      data: peopleDataResolverList,
    },
  },
  {
    path: 'form/naturalPerson/:id',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
    resolve: {
      data: peopleDataResolverForm,
    },
  },
  {
    path: 'form/legalPerson/:id',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
    resolve: {
      data: peopleDataResolverForm,
    },
  },
];
