import { Component, inject } from '@angular/core';
import { LoadComptesUseCase } from '../../features/compte/usecases/load-comptes.usecase';
import { CompteStore } from '../../features/compte/store/compte.store';
import {SelectCompteComponent} from './components/select-compte.component';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [SelectCompteComponent],
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
