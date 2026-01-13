import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'comptes',
    // Chargement différé (Lazy Loading)
    loadComponent: () => import('./pages/comptes/comptes.component').then(m => m.ComptesComponent)
  },
  {
    path: '',
    redirectTo: 'comptes',
    pathMatch: 'full'
  }
];
