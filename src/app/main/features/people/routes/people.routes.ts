import { Routes } from '@angular/router';
import { peopleDataResolverForm } from './people-data-resolver-form';

export const peopleRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('../people-form/people').then((m) => m.People),
    resolve : {
      data : peopleDataResolverForm
    }
  },
];
