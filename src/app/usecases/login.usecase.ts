
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import {LoginApi} from '../api/login.api';
import {AuthStore} from '../store/auth.store';
import {AuthGateway} from '../gateway/auth-gateway';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private gateway = inject(AuthGateway);
  private store = inject(AuthStore);
  private router = inject(Router);


  execute(clientCode: string, password: string): void {
    this.gateway.login(clientCode, password)
      .pipe(
        take(1)).subscribe({
        next: (response) => {
          // L'API a déjà fait le localStorage.setItem dans son 'tap'
          // Maintenant on prévient le STORE que c'est un succès
          this.store.setLoginSuccess(response.user.name,response.user.clientCode);
          //  Redirection vers la page des comptes
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.store.setError("Identifiants incorrects");
        }
      });
  }
}
