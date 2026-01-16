import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction } from '../models/view-transactions.model';

@Injectable({ providedIn: 'root' })
export class ViewTransactionsApi {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // On ajoute le paramètre accountId ici
  getAllTransactions(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/accounts/${accountId}/transactions`
    );
  }

  getTransactionById(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/transactions/${transactionId}`);
  }
}
