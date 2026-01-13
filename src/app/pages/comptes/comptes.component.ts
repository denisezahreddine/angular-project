import { Component, inject } from '@angular/core';
import { LoadComptesUseCase } from '../../compte/usecases/load-comptes.usecase';
import { CompteStore } from '../../compte/store/compte.store';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [],
  templateUrl: './comptes.component.html'
})
export class ComptesComponent {
  private loadComptes = inject(LoadComptesUseCase);
  private store = inject(CompteStore);

  // Accès direct au signal du store
  comptes = this.store.comptes;

  constructor() {
    this.loadComptes.execute();
  }
}
