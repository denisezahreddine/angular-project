import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { LoadComptesUseCase } from '../../compte/usecases/load-comptes.usecase';
import { CompteStore } from '../../compte/store/compte.store';
import { SelectCompteComponent } from './components/select-compte.component';
import { ButtonComponent } from '../../shared/button-component/button-component';
import { Router } from '@angular/router';
import { LienComponent } from "../../shared/lien-component/lien-component";

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [SelectCompteComponent, ButtonComponent, LienComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  private loadComptes = inject(LoadComptesUseCase);
  private store = inject(CompteStore);

  private router = inject(Router);
  // Accès direct au signal du store
  comptes = this.store.comptes;
  selectedAccountId: string | null = null;
  selectedCompte = this.store.selectedCompte;

     // On crée un signal pour stocker l'ID sélectionné reçu du sélecteur
     currentSelectedId = signal<string | null>(null);


     // Action déclenchée par le clic sur "view transaction"
     viewTransactions() {
       const id = this.currentSelectedId();
       if (id) {
         // Cela va générer l'URL : /transactions/votre-id-ici
         this.router.navigate(['view-transactions/', id]);
       } else {
         alert("Veuillez sélectionner un compte d'abord !");
       }
     }
  isNoAccountSelected = computed(() => !this.store.selectedId());

  ngOnInit() {
    if (this.comptes().length === 0) {
      this.loadComptes.execute();
    }
  }
//les méthodes que vous appelez dans votre HTML
  onInfo() {
    const id = this.store.selectedId();
    if (id) {
      this.router.navigate(['/accounts', id]);
    }

  }

 //id de compte selectionné
  onCompteSelected(id: string) {
    this.currentSelectedId.set(id);
    this.selectedAccountId = id;
    this.store.selectCompte(id);
  }

  onSend() {
    if (!this.selectedAccountId) {
      console.log('Pas de compte sélectionné');
      return;
    }
    this.router.navigate(['/transaction', this.selectedAccountId]);
  }

  onOpen() {
    this.router.navigate(['/open']);
  }
}
