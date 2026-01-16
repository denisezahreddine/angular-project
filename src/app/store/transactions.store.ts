import { computed, Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionsStore {
  // state: map accountId -> list of transactions
  private readonly _transactionsByAccount = signal<Record<string, Transaction[]>>({});

  readonly transactionsByAccount = this._transactionsByAccount.asReadonly();

  // computed helper to list all transactions flattened (rarely used)
  readonly allTransactions = computed(() =>
    Object.values(this._transactionsByAccount()).flat()
  );

  getTransactionsForAccount(accountId: string): Transaction[] {
    return this._transactionsByAccount()[accountId] ?? [];
  }

  setTransactionsForAccount(accountId: string, transactions: Transaction[]): void {
    this._transactionsByAccount.update((state) => ({
      ...state,
      [accountId]: [...transactions],
    }));
  }

  findById(transactionId: string): Transaction | null {
    // cherche dans toutes les listes (utile pour un détail)
    const all = this.allTransactions();
    return all.find((t) => t.id === transactionId) ?? null;
  }

  // upsert the transaction for both emitter and receiver accounts
  upsertTransaction(tx: Transaction): void {
    this._transactionsByAccount.update((state) => {
      const next = { ...state };

      const sortByDateDesc = (list: Transaction[]) =>
        [...list].sort((a, b) => {
          const da = a.emittedAt ? Date.parse(a.emittedAt) : 0;
          const db = b.emittedAt ? Date.parse(b.emittedAt) : 0;
          return db - da;
        });

      const upsert = (accountId: string | undefined | null) => {
        const id = (accountId ?? '').trim();
        if (!id) return;
        const existingList = next[id] ?? [];
        const idx = existingList.findIndex((t) => t.id === tx.id);
        if (idx >= 0) {
          // mise à jour
          const updated = [...existingList];
          updated[idx] = tx;
          next[id] = sortByDateDesc(updated);
        } else {
          // insertion en tête, puis tri
          next[id] = sortByDateDesc([tx, ...existingList]);
        }
      };

      upsert(tx.emitter?.id);
      upsert(tx.receiver?.id);

      return next;
    });
  }

  clear() {
    this._transactionsByAccount.set({});
  }
}
