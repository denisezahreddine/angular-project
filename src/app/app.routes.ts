import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {authGuard} from './core/auth.guard';
import { LayoutComponent } from './shared/layout/layout';

export const routes: Routes = [

 {
    path: '',
    component: LayoutComponent, // On enveloppe tout dans le layout
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

    ]
  },
  {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**', // Redirige les erreurs 404 vers login
        redirectTo: 'login'
      },
];
