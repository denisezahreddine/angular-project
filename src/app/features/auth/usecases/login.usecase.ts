//applique les regles de login ( 8 chiffre/6 chiffre) et appel auth.service
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import {LoginApi} from '../api/login.api';
import {AuthStore} from '../store/auth.store';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private api = inject(LoginApi);
  private store = inject(AuthStore);
  private router = inject(Router);


  execute(clientCode: string, password: string): void {
    this.api.login(clientCode, password)
      .pipe(
        take(1)).subscribe({
        next: () => {
          // L'API a déjà fait le localStorage.setItem dans son 'tap'
          // Maintenant on prévient le STORE que c'est un succès
          this.store.setLoginSuccess();
          //  Redirection vers la page des comptes
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.store.setError("Identifiants incorrects");
        }
      });
  }
}
