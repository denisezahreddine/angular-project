import {Component, inject, signal, computed, OnInit} from '@angular/core';
import {CompteStore} from '../../../features/compte/store/compte.store';
import {LoadComptesUseCase} from '../../../features/compte/usecases/load-comptes.usecase';


@Component({
  selector: 'app-select-compte',
  standalone: true,
  templateUrl: './select-compte.component.html',
  styleUrl: './select-compte.component.css'
})
export class SelectCompteComponent  {
  private store = inject(CompteStore);


  // On récupère la liste des comptes depuis le store
  comptes = this.store.comptes;

  // Signal pour suivre l'ID sélectionné
  selectedId = signal<string | null>(null);

  // Signal calculé : dès que selectedId ou comptes change, il se met à jour
  selectedCompte = computed(() =>
    this.comptes().find(c => c.id === this.selectedId())
  );



  onSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedId.set(selectElement.value);
  }
}
