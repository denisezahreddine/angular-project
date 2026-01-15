import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { OpenAccountComponent } from './pages/open-account.component/open-account.component';
import { authGuard } from './core/auth.guard';
import { LayoutComponent } from './shared/layout/layout';

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
        path: 'open', // L'URL sera donc /open
        component: OpenAccountComponent,
        canActivate: [authGuard] // On protège aussi cette page
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
    path: '**',
    redirectTo: 'login'
  },
];
