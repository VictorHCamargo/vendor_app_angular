import { Routes } from '@angular/router';
import { colorResolveDataList } from './color-resolve-data-list';
import { colorResolveDataForm } from './color-resolve-data-form';

export const colorRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('../color-form/color').then((m) => m.Color),
  },
  {
    path: 'list',
    loadComponent: () => import('../color-list/color-list').then((m) => m.ColorList),
    resolve : {
      data : colorResolveDataList
    }
  },
  {
    path: 'form/:id',
    loadComponent: () => import('../color-form/color').then((m) => m.Color),
    resolve : {
      data : colorResolveDataForm
    }
  },
];
