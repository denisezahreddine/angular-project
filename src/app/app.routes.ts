import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'comptes',
    // Chargement différé (Lazy Loading)
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '',
    redirectTo: 'comptes',
    pathMatch: 'full'
  }
];
