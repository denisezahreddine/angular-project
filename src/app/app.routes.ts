import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {authGuard} from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    //path: 'comptes',
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**', // Redirige les erreurs 404 vers login
    redirectTo: 'login'
    },
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
