import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadComptesUseCase } from '../../compte/usecases/load-comptes.usecase';
import { CompteStore } from '../../compte/store/compte.store';
import { SelectCompteComponent } from './components/select-compte.component';
import { ButtonComponent } from '../../shared/button-component/button-component';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [SelectCompteComponent, ButtonComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private loadComptes = inject(LoadComptesUseCase);
  private store = inject(CompteStore);
  private router = inject(Router);

  comptes = this.store.comptes;

  constructor() {
    this.loadComptes.execute();
  }

  onInfo() {
    console.log('Bouton Info cliqué !');
  }

  onSend() {
    console.log('Bouton Envoyer cliqué !');
  }

  onOpen() {
    this.router.navigate(['/open']);
  }
}
