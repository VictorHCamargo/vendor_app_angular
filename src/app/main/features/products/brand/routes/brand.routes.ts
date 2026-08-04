import { Routes } from '@angular/router';
import { brandDataResolverList } from './brand-data-resolver-list';
import { brandDataResolverForm } from './brand-data-resolver-form';

export const brandRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('../brand-form/brand').then((m) => m.Brand),
  },
  {
    path: 'list',
    loadComponent: () => import('../brand-list/brand-list').then((m) => m.BrandList),
    resolve: {
      data: brandDataResolverList,
    },
  },
  {
    path: 'form/:id',
    loadComponent: () => import('../brand-form/brand').then((m) => m.Brand),
    resolve: {
      data: brandDataResolverForm,
    },
  },
];
