import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ViewTransactionsApi } from '../api/view-transactions.api';
import { Transaction } from '../models/view-transactions.model';

@Injectable({
  providedIn: 'root'
})
export class ViewTransactionsUsecase {
  private readonly api = inject(ViewTransactionsApi);

  /**
   * Récupère les transactions et peut appliquer une logique métier
   * (ex: trier par date la plus récente)
   */
  execute(accountId: string): Observable<Transaction[]> {
      // Transmettez l'accountId à l'appel API
      return this.api.getAllTransactions(accountId).pipe(
      map(transactions => {
        // Logique métier : on trie les transactions de la plus récente à la plus ancienne
        return transactions.sort((a, b) =>
          new Date(b.emittedAt).getTime() - new Date(a.emittedAt).getTime()
        );
      })
    );
  }
}
