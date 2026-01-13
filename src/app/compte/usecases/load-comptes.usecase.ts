import { Injectable, inject } from '@angular/core';
import { CompteApi } from '../api/compte.api';
import { CompteStore } from '../store/compte.store';
import { take } from 'rxjs';
//Use case pour charger les comptes
//Appelle compte.api et met à jour compte.store.
//Transforme les données en quelque chose de prêt pour la vue

@Injectable({ providedIn: 'root' })
export class LoadComptesUseCase {
  private api = inject(CompteApi);
  private store = inject(CompteStore);

  execute(): void {
    this.api.getComptes().pipe(take(1)).subscribe({
      next: (comptes) => this.store.setComptes(comptes),
      error: (err) => console.error('Erreur chargement:', err)
    });
  }
}
