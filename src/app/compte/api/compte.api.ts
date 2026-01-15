import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Compte} from '../models/compte.model';
import {environment} from '../../../environments/environment';

//Appel HTTP vers le backend des comptes
@Injectable({ providedIn: 'root' })
export class CompteApi {

  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;


  getComptes() {
    return this.http.get<Compte[]>(`${this.baseUrl}/accounts`);
  }

  // Récupère un compte spécifique par son ID
  getAccountById(accountId: string) {
    return this.http.get<Compte>(`${this.baseUrl}/accounts/${accountId}`);
  }


}
