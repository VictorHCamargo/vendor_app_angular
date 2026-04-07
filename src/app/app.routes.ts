import { Routes } from '@angular/router';
import { Unauthorized } from './unauthorized/unauthorized';
import { Login } from './login/login';
import { authGuard } from './main/shared/guards/auth.guard';


export const routes: Routes = [
    {
        path : "unauthorized",
        component : Unauthorized
    },
    {
        path : "login",
        component : Login
    },
    {
        path : "",
        canActivate : [authGuard],
        loadComponent : () => import('./main/main').then(m => m.Main),
        children : [
            {
                path:"category",
                loadChildren: () => import('./main/features/products/category/routes/category.routes').then(m => m.categoryRoutes)
            },
            {
                path:"group",
                loadChildren: () => import('./main/features/products/group/routes/group.routes').then(m => m.groupRoutes)
            },
            {
                path: "",
                loadComponent: () => import('./main/features/pages/home-page/home-page').then(m => m.HomePage)
            }
        ]
    },
    {
        path : "**",
        redirectTo : "login"
    }
];
