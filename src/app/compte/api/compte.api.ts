import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Compte} from '../models/compte.model';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompteApi {

  private http = inject(HttpClient); // Syntaxe inject() recommandée
  private readonly baseUrl = environment.apiUrl;
  private readonly token=environment.token;

  getComptes() {
    return this.http.get<Compte[]>(`${this.baseUrl}/accounts`, {
      headers: {
        'Authorization': `Bearer ${this.token}`

      }
    });
  }

}
