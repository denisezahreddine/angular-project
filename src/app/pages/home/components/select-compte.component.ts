import {Component, inject, signal, computed, EventEmitter, Output, OnInit} from '@angular/core';
import {CompteStore} from '../../../store/compte.store';
import {CopyButtonComponent} from '../../../shared/copy-button-component/copy-button-component';

@Component({
  selector: 'app-select-compte',
  standalone: true,
  imports: [CopyButtonComponent],
  templateUrl: './select-compte.component.html',
  styleUrl: './select-compte.component.css'
})
export class SelectCompteComponent {
  private store = inject(CompteStore);

  comptes = this.store.comptes;


  selectedId = this.store.selectedId;
//pour remonter l’accountId vers HomeComponent.
  @Output() selectCompte = new EventEmitter<string>();

  selectedCompte = computed(() =>
    this.comptes().find(c => c.id === this.selectedId())
  );

  onSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const id= selectElement.value;
    this.selectedId.set(id);
    this.store.selectCompte(id);
    this.selectCompte.emit(id);
  }
}
