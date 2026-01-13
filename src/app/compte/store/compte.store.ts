import { Injectable, signal } from '@angular/core';
import { Compte } from '../models/compte.model';

@Injectable({ providedIn: 'root' })
export class CompteStore {
  // Un signal privé pour l'état, et un signal public en lecture seule
  private _comptes = signal<Compte[]>([]);
  readonly comptes = this._comptes.asReadonly();

  setComptes(comptes: Compte[]) {
    this._comptes.set(comptes);
  }

  clear() {
    this._comptes.set([]);
  }
}
