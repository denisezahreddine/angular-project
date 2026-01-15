import {inject, Injectable} from '@angular/core';
import {AuthGateway} from './auth-gateway';
import {Observable, tap} from 'rxjs';
import {RegistrationApi} from '../api/registration.api';
import {LoginResponse} from '../../compte/models/loginResponse.model';

@Injectable({providedIn: 'root'})
export class AuthGatewayImpl implements AuthGateway {
  private api = inject(RegistrationApi);

  register(clientCode: string, password: string): Observable<LoginResponse> {
    return this.api.register(clientCode, password).pipe(
      tap(response => {
        // On stocke le token pour les futurs appels API
        localStorage.setItem('access_token', response.jwt);
      })
    );
  }
}
