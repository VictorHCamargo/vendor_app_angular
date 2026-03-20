import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'category/form/:id',
    renderMode: RenderMode.Client // Diz ao Angular: "Não tente fazer prerender disso no build"
  },
  {
    path: 'group/form/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
