import { Injectable, inject } from '@angular/core';
import { CompteStore } from '../store/compte.store';

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

  execute(input: CreateTransactionInput): ResultatCreationTransaction {
    input.amount = Number(input.amount);
    if (isNaN(input.amount)) {
      return { ok: false, errorMessage: 'Montant invalide' };
    }
    // 1) Règle métier : montant > 0
    if (input.amount <= 0) {
      return { ok: false, errorMessage: 'Le montant doit être positif' };
    }

    // 2) Récupérer le compte émetteur
    const compte = this.store.getCompteById(input.fromAccountId);
    if (!compte) {
      return { ok: false, errorMessage: 'Compte émetteur introuvable' };
    }

    // 3) Règle métier : montant ≤ solde
    if (input.amount > compte.balance) {
      return {
        ok: false,
        errorMessage: 'Le montant doit être inférieur ou égal au solde',
      };
    }


    // 4) Mettre à jour le solde en local
    this.store.debiterCompte(input.fromAccountId, input.amount);

    // 5) Succès
    return { ok: true };
  }
}
