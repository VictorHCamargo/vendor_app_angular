import { Routes } from '@angular/router';
import { Unauthorized } from './unauthorized/unauthorized';
import { Login } from './login/login';
import { authGuard } from './main/shared/guards/auth.guard';
import { Main } from './main/main';
import { HomePage } from './main/features/pages/home-page/home-page';

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
        path: 'category',
        loadChildren: () =>
          import('./main/features/products/category/routes/category.routes').then(
            (m) => m.categoryRoutes,
          ),
      },
      {
        path: 'group',
        loadChildren: () =>
          import('./main/features/products/group/routes/group.routes').then((m) => m.groupRoutes),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
