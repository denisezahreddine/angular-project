import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type EmitTransactionRequest = {
  emitterAccountId: string;
  receiverAccountId: string;
  amount: number;
  description: string;
};

//  réponse de Swagger,
export type TransactionResponse = {
  id: string;
  status: string;
  emitterAccountId: string;
  receiverAccountId: string;
  amount: number;
  description: string;
};

@Injectable({ providedIn: 'root' })
export class TransactionsApi {

  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private get authHeaders() {
    const token = localStorage.getItem('access_token') ?? '';
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  emitTransaction(body: EmitTransactionRequest) {
    // POST /transactions/emit
    return this.http.post<TransactionResponse>(
      `${this.baseUrl}/transactions/emit`,
      body,
      { headers: this.authHeaders },
    );
  }

  getTransactionById(transactionId: string) {
    // GET /transactions/{transactionId}
    return this.http.get<TransactionResponse>(
      `${this.baseUrl}/transactions/${transactionId}`,
      { headers: this.authHeaders },
    );
  }

  getTransactionsByAccount(accountId: string) {
    // GET /accounts/{accountId}/transactions
    return this.http.get<TransactionResponse[]>(
      `${this.baseUrl}/accounts/${accountId}/transactions`,
      { headers: this.authHeaders },
    );
  }

}

