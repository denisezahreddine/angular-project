import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from '../models/compte.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OpenApi {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  createCompte(compteData: { label: string; initialBalance: number }): Observable<Compte> {
    return this.http.post<Compte>(`${this.baseUrl}/accounts`, compteData);
  }
}
