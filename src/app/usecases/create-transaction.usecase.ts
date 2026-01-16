import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap, take } from 'rxjs/operators';
import { CompteStore } from '../store/compte.store';
import { TransactionsApi } from '../api/transactions.api';
import { TransactionsStore } from '../store/transactions.store';
import { Transaction } from '../models/transaction.model';

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
  private transactionsStore = inject(TransactionsStore);

  execute(input: CreateTransactionInput) {
    // 1) petites validations métier côté front
    const amount = Number(input.amount);
    const toAccountId = input.toAccountId?.trim() ?? '';
    const description = input.description?.trim() ?? '';

    if (!toAccountId) return of({ ok: false, errorMessage: 'Compte destinataire manquant' });
    if (input.fromAccountId === toAccountId) return of({ ok: false, errorMessage: 'Impossible d’envoyer sur le même compte' });
    if (isNaN(amount)) return of({ ok: false, errorMessage: 'Montant invalide' });
    if (amount <= 0) return of({ ok: false, errorMessage: 'Le montant doit être positif' });

    const compte = this.store.getCompteById(input.fromAccountId);
    if (!compte) return of({ ok: false, errorMessage: 'Compte émetteur introuvable' });
    if (amount > compte.balance) return of({ ok: false, errorMessage: 'Le montant doit être inférieur ou égal au solde' });

    // 2) appel API puis mise à jour des stores si succès
    return this.transactionsApi.emitTransaction({
      emitterAccountId: input.fromAccountId,
      receiverAccountId: toAccountId,
      amount,
      description,
    }).pipe(
      take(1),
      tap((transaction: Transaction) => {
        // mettre à jour le front localement pour un retour rapide
        this.store.debiterCompte(input.fromAccountId, amount);
        this.store.crediterCompte(toAccountId, amount);
        this.transactionsStore.upsertTransaction(transaction);
      }),
      map(() => ({ ok: true } as ResultatCreationTransaction)),
      catchError((err) => of({
        ok: false,
        errorMessage: err?.error?.message || err?.message || 'Erreur lors de la création de la transaction',
      })),
    );
  }
}
