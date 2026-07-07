import { Routes } from '@angular/router';
import { markDataResolverList } from './mark-data-resolver-list';
import { markDataResolverForm } from './mark-data-resolver-form';

export const markRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('../mark-form/mark').then((m) => m.Mark),
  },
  {
    path: 'list',
    loadComponent: () => import('../mark-list/mark-list').then((m) => m.MarkList),
    resolve: {
      data: markDataResolverList,
    },
  },
  {
    path: 'form/:id',
    loadComponent: () => import('../mark-form/mark').then((m) => m.Mark),
    resolve: {
      data: markDataResolverForm,
    },
  },
];
