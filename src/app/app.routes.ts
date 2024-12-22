import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'default',
    loadComponent: () =>
      import('./features/default/default.component').then(
        (c) => c.DefaultComponent,
      ),
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./features/signals/signals.component').then(
        (c) => c.SignalsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
