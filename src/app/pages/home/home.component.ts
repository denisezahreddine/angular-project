import { Component, inject } from '@angular/core';
import { LoadComptesUseCase } from '../../compte/usecases/load-comptes.usecase';
import { CompteStore } from '../../compte/store/compte.store';
//la page Home appel load-home-data.usecase +garde le vieuw model Home (comptes , celui selectionné ,last transaction)
@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private loadComptes = inject(LoadComptesUseCase);
  private store = inject(CompteStore);

  // Accès direct au signal du store
  comptes = this.store.comptes;

  constructor() {
    this.loadComptes.execute();
  }
}
