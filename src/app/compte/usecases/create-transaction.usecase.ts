import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CompteStore } from '../store/compte.store';
import { TransactionsApi } from '../api/transactions.api';

export type CreateTransactionInput = {
  fromAccountId: string;   // vient de la page
  toAccountId: string;     // vient du formulaire
  amount: number;
  description: string;
};

export type ResultatCreationTransaction = {
  ok: boolean;
  errorMessage?: string;
};

@Injectable({ providedIn: 'root' })
export class CreateTransactionUsecase {
  private store = inject(CompteStore);
  private transactionsApi = inject(TransactionsApi);

  execute(input: CreateTransactionInput) {
    input.amount = Number(input.amount);
    if (isNaN(input.amount)) {
      return of<ResultatCreationTransaction>({
        ok: false,
        errorMessage: 'Montant invalide',
      });
    }
    // 1) Règle métier : montant > 0
    if (input.amount <= 0) {
      return of<ResultatCreationTransaction>({
        ok: false,
        errorMessage: 'Le montant doit être positif',
      });
    }

    // 2) Récupérer le compte émetteur
    const compte = this.store.getCompteById(input.fromAccountId);
    if (!compte) {
      return of<ResultatCreationTransaction>({
        ok: false,
        errorMessage: 'Compte émetteur introuvable',
      });
    }

    // 3) Règle métier : montant ≤ solde
    if (input.amount > compte.balance) {
      return of<ResultatCreationTransaction>({
        ok: false,
        errorMessage: 'Le montant doit être inférieur ou égal au solde',
      });
    }

    // 4) Appel HTTP réel vers le backend Swagger
    return this.transactionsApi
      .emitTransaction({
        emitterAccountId: input.fromAccountId,
        receiverAccountId: input.toAccountId,
        amount: input.amount,
        description: input.description,
      })
      .pipe(
        tap(() => {
          // 5) Si succès, on met à jour le solde en local
          this.store.debiterCompte(input.fromAccountId, input.amount);
        }),
        map(() => ({
          ok: true,
        } as ResultatCreationTransaction)),
        catchError((err) => {
          console.error('Erreur création transaction', err);
          return of<ResultatCreationTransaction>({
            ok: false,
            errorMessage: 'Erreur lors de la création de la transaction',
          });
        }),
      );
  }
}
