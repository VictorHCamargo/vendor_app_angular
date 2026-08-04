import { Routes } from '@angular/router';
import { Unauthorized } from './unauthorized/unauthorized';
import { Login } from './login/login';
import { authGuard } from './main/shared/guards/auth.guard';
import { Main } from './main/main';
import { HomePage } from './main/features/pages/home-page/home-page';
import { ExternalPartner } from './main/external-partner/external-partner';

export const routes: Routes = [
  {
    path: 'unauthorized',
    component: Unauthorized,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    canActivate: [authGuard],
    component: Main,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'group',
        loadChildren: () =>
          import('./main/features/products/group/routes/group.routes').then((m) => m.groupRoutes),
      },
      {
        path: 'people',
        loadChildren: () =>
          import('./main/features/people/routes/people.routes').then((m) => m.peopleRoutes),
      },
      {
        path: 'color',
        loadChildren: () =>
          import('./main/features/products/color/routes/color.routes').then((m) => m.colorRoutes),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./main/features/products/brand/routes/brand.routes').then((m) => m.brandRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./main/features/products/routes/products.routes').then((m) => m.productsRoutes),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'externalPartner',
    component: ExternalPartner,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
