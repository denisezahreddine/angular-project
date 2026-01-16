import { inject, Injectable, signal } from '@angular/core';
import { ViewTransactionsUsecase } from '../usecases/view-transactions.usecase';
import { Transaction } from '../models/view-transactions.model';

@Injectable({ providedIn: 'root' })
export class ViewTransactionStore {
  private readonly usecase = inject(ViewTransactionsUsecase);

  readonly transactions = signal<Transaction[]>([]);
  readonly loading = signal<boolean>(false);

  /**
   * Charge les transactions pour un compte spécifique.
   * @param accountId L'identifiant du compte sélectionné.
   */
  loadAllTransactions(accountId: string): void {
    this.loading.set(true);

    // On passe maintenant l'accountId à la méthode execute()
    this.usecase.execute(accountId).subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des transactions', err);
        this.loading.set(false);
      }
    });
  }
}
