import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {authGuard} from './core/auth.guard';
import {LayoutComponent} from './shared/layout/layout';
import {ProfileComponent} from './pages/profile/profile.component';
import {TransactionPageComponent} from './pages/transaction/transaction';

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
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
      },
      {
        path: 'transaction/:accountId',
        component: TransactionPageComponent,
        canActivate: [authGuard]
      }

    ]
  },
  {
        path: 'login',
        component: LoginComponent
      },
    //  {
      //  path: '**', // Redirige les erreurs 404 vers login
        //redirectTo: 'login'
    //  },

];
