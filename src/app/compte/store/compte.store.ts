import {computed, Injectable, signal} from '@angular/core';
import { Compte } from '../models/compte.model';

@Injectable({ providedIn: 'root' })
export class CompteStore {
  // Un signal privé pour l'état, et un signal public en lecture seule
  private _comptes = signal<Compte[]>([]);
  readonly comptes = this._comptes.asReadonly();

  private  _compte = signal<Compte|null>(null);
  readonly compte = this._compte.asReadonly();

  // On stocke l'ID du compte sélectionné
  readonly selectedId = signal<string | null>(null);


  // On calcule automatiquement le compte sélectionné
  readonly selectedCompte = computed(() =>
    this._comptes().find(c => c.id === this.selectedId()) || null
  );

  setComptes(comptes: Compte[]) {
    this._comptes.set(comptes);
  }

  clear() {
    this._comptes.set([]);
  }

  // Méthode pour changer la sélection
  selectCompte(id: string) {
    this.selectedId.set(id);
  }

  // 1) Récupérer un compte par id (utile dans le use case)
  getCompteById(id: string): Compte | undefined {
    return this._comptes().find(c => c.id === id);
  }
  // 2) Débiter un compte (mettre à jour le solde après transaction)
  debiterCompte(id: string, amount: number): void {
    const updated = this._comptes().map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        balance: c.balance - amount,
      };
    });
    this._comptes.set(updated);
  }

  // 3) Créditer un compte (quand on reçoit de l’argent)
  setCompteDetail(compte: Compte) {
    this._compte.set(compte);
  }
  // 3) Créditer un compte (utile quand on reçoit une transaction)
  crediterCompte(id: string, amount: number): void {
    const updated = this._comptes().map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        balance: c.balance + amount,
      };
    });
    this._comptes.set(updated);
  }

}
