import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs';
import {LoginResponse} from '../models/loginResponse.model';


@Injectable({ providedIn: 'root' })
export class LoginApi {

  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;


  login(clientCode: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      clientCode,
      password
    }).pipe(
      tap(response => {
        // On stocke le token pour les futurs appels API
        localStorage.setItem('access_token', response.jwt);

      })
    );
  }

}
