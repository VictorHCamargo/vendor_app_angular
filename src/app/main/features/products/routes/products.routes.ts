import { Routes } from '@angular/router';
import { productsDataResolverList } from './products-data-resolver-list';

export const productsRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('../products-list/products-list').then((m) => m.ProductsList),
    resolve: {
      data: productsDataResolverList,
    },
  },
];
