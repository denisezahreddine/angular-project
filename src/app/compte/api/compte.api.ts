import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Compte} from '../models/compte.model';
//Appel HTTP vers le backend des comptes
@Injectable({ providedIn: 'root' })
export class CompteApi {

  private http = inject(HttpClient); // Syntaxe inject() recommandée
  private readonly baseUrl = 'https://coding-bank.fly.dev/api';


  getComptes() {
    return this.http.get<Compte[]>(`${this.baseUrl}/accounts`);
  }
}
