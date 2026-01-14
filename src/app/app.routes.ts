import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // On enveloppe tout dans le layout
    children: [
      {
        path: 'comptes',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: '',
        redirectTo: 'comptes',
        pathMatch: 'full'
      }
    ]
  }
];
