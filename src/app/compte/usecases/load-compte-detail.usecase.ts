
import { inject, Injectable } from '@angular/core';
import { CompteApi } from '../api/compte.api';
import { CompteStore } from '../store/compte.store';

@Injectable({ providedIn: 'root' })
export class LoadCompteDetailUseCase {
  private api = inject(CompteApi);
  private store = inject(CompteStore);

  execute(accountId: string): void {
    this.api.getAccountById(accountId).subscribe({
      next: (compte) => {
        this.store.setCompteDetail(compte);
      },
      error: (err) => console.error('Erreur chargement compte:', err)
    });
  }
}
