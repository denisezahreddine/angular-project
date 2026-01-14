import {Component, inject, signal, computed} from '@angular/core';
import {CompteStore} from '../../../compte/store/compte.store';

@Component({
  selector: 'app-select-compte',
  standalone: true,
  templateUrl: './select-compte.component.html',
  styleUrl: './select-compte.component.css'
})
export class SelectCompteComponent {
  private store = inject(CompteStore);

  comptes = this.store.comptes;
  selectedId = signal<string | null>(null);

  selectedCompte = computed(() =>
    this.comptes().find(c => c.id === this.selectedId())
  );

  onSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedId.set(selectElement.value);
  }
}
