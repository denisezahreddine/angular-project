import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user.models';


@Injectable({ providedIn: 'root' })
export class ProfileApi {

  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getCurrentUser() {
    return this.http.get<User>(`${this.baseUrl}/auth/current-user`);
  }

}
