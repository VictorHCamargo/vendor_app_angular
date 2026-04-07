import { Routes } from "@angular/router";
import { groupDataResolverList } from "./group-data-resolver-list";
import { groupDataResolverForm } from "./group-data-resolver-form";

export const groupRoutes : Routes = [
    {
        path:"form",
        loadComponent: () => import('../group-form/group').then(m => m.Group)
    },
    {
        path:"list",
        loadComponent: () => import('../group-list/group-list').then(m => m.GroupList),
        resolve: {
            data : groupDataResolverList
        }
    },
    {
        path:"form/:id",
        loadComponent: () => import('../group-form/group').then(m => m.Group),
        resolve: {
            data : groupDataResolverForm
        }
    }
]