import {computed, Injectable, signal} from '@angular/core';
import { Compte } from '../api/models/compte.model';
//store local ( état global des comptes )
@Injectable({ providedIn: 'root' })
export class CompteStore {
  // Un signal privé pour l'état, et un signal public en lecture seule
  private _comptes = signal<Compte[]>([]);
  readonly comptes = this._comptes.asReadonly();

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
}
