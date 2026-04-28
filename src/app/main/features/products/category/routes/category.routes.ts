import { Routes } from '@angular/router';
import { categoryDataResolverForm } from './category-data-resolver-form';
import { categoryDataResolverList } from './category-data-resolver-list';

export const categoryRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('../category-form/category').then((m) => m.Category),
  },
  {
    path: 'list',
    loadComponent: () => import('../category-list/category-list').then((m) => m.CategoryList),
    resolve: {
      data: categoryDataResolverList,
    },
  },
  {
    path: 'form/:id',
    loadComponent: () => import('../category-form/category').then((m) => m.Category),
    resolve: {
      data: categoryDataResolverForm,
    },
  },
];
