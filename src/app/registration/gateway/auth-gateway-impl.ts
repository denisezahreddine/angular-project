import {inject, Injectable} from '@angular/core';
import {AuthGateway} from './auth-gateway';
import {Observable, tap} from 'rxjs';
import {RegistrationApi} from '../api/registration.api';
import {LoginResponse} from '../../compte/models/loginResponse.model';
import {LoginApi} from '../../compte/api/login.api';

@Injectable({providedIn: 'root'})
export class AuthGatewayImpl implements AuthGateway {

  private apiRegister = inject(RegistrationApi);
  private apiLogin = inject(LoginApi);

  register(clientCode: string, password: string): Observable<LoginResponse> {
    return this.apiRegister.register(clientCode, password).pipe(
      tap(response => {
        // On stocke le token pour les futurs appels API
        localStorage.setItem('access_token', response.jwt);
      })
    );
  }

  login(clientCode: string, password: string): Observable<LoginResponse> {
    return this.apiLogin.login(clientCode, password).pipe(
      tap(response => {
        // On stocke le token pour les futurs appels API
        localStorage.setItem('access_token', response.jwt);
      })
    );
  }
}
