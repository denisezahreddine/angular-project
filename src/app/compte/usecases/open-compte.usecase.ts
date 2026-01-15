import { inject, Injectable } from '@angular/core';
import { CompteStore } from '../store/compte.store';
import { tap } from 'rxjs';
import { OpenApi } from '../api/open.api';
import { Compte } from '../models/compte.model';

@Injectable({ providedIn: 'root' })
export class OpenCompteUseCase {
  private api = inject(OpenApi);
  private store = inject(CompteStore);

  execute(label: string, initialBalance: number) {
    const newCompteData = {
      label: label,
      initialBalance: initialBalance
    };

    return this.api.createCompte(newCompteData).pipe(
      tap((newCompte: Compte) => {
        const actualComptes = this.store.comptes();
        this.store.setComptes([...actualComptes, newCompte]);
      })
    );
  }
}
