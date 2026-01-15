import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {authGuard} from './core/auth.guard';
import {LayoutComponent} from './shared/layout/layout';
import {ProfileComponent} from './pages/profile/profile.component';
import {TransactionPageComponent} from './pages/transaction/transaction';
import { OpenAccountComponent } from './pages/open-account.component/open-account.component';
import {RegisterComponent} from './pages/registration/register.component';
import { ViewTransactionComponent } from './pages/view-transaction/view-transaction';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'open',
        component: OpenAccountComponent,
        canActivate: [authGuard]
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
      },
      // --- ROUTE MODIFIÉE POUR ÊTRE DYNAMIQUE ---
      {
        path: 'view-transactions/:accountId', // Ajout du paramètre :accountId
        component: ViewTransactionComponent,
        canActivate: [authGuard]
      },
      // ------------------------------------------
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
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
