import { Routes } from '@angular/router';
import { productsDataResolverList } from './products-data-resolver-list';
import { productsDataResolverForm } from './products-data-resolver-form';

export const productsRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('../products-form/products-form').then((m) => m.ProductsForm),
  },
  {
    path: 'list',
    loadComponent: () => import('../products-list/products-list').then((m) => m.ProductsList),
    resolve: {
      data: productsDataResolverList,
    },
  },
  {
    path: 'form/:id',
    loadComponent: () => import('../products-form/products-form').then((m) => m.ProductsForm),
    resolve: {
      data: productsDataResolverForm,
    },
  },
];
