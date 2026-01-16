import {Component, inject, OnInit, signal, computed} from '@angular/core'; // Ajoutez signal
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ViewTransactionStore} from '../../store/view-transaction.store';
import {Router} from '@angular/router';
import {CopyButtonComponent} from '../../shared/copy-button-component/copy-button-component';
import {ButtonComponent} from '../../shared/button-component/button-component';
import {TransactionViewModel} from '../../viewmodels/TransactionViewModel';
import {RegistrationEvent} from '../../event/RegistrationEvent';
import {ErrorData} from '../../event/errorData';
import {EventBus} from '../../event/EventBus';
import {CancelTransactionEvent} from '../../event/CancelTransactionEvent';
import {SnackbarStore} from '../../store/snackbare.store';
import {SnackBarComponent} from '../../shared/snack-bar-component/snack-bar-component';


@Component({
  selector: 'app-view-transaction',
  standalone: true,
  providers: [TransactionViewModel],
  imports: [CommonModule, CopyButtonComponent, ButtonComponent,SnackBarComponent],
  templateUrl: './view-transaction.html',
  styleUrl: './view-transaction.css'
})
export class ViewTransactionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ViewTransactionStore);
  readonly eventBus = inject(EventBus);
  private vm = inject(TransactionViewModel);
  private snackbar = inject(SnackbarStore);
  // Création d'un signal pour stocker l'ID et l'utiliser dans le HTML
  accountId = signal<string | null>(null);
  private router = inject(Router);

  onBack() {
    this.router.navigate(['/home']);
  }

  limit = signal<number>(3);

  // 2. Créer une liste filtrée (computed se met à jour quand transactions ou limit changent)
  visibleTransactions = computed(() =>
    this.store.transactions().slice(0, this.limit())
  );

  // 3. Fonction pour augmenter la limite
  showMore() {
    this.limit.update(prev => prev + 10); // Augmente de 10 à chaque clic
  }

  deleteTransaction(id: string) {
     const retryAction = () => {
      console.log("Retry: Annulation de la transaction", id);
      this.vm.cancelTransaction(id);
    };

    // 2. On enregistre le listener AVANT de lancer l'action
    this.registerListenerTransaction(retryAction);

    this.vm.cancelTransaction(id)
  }

//tofix
  private registerListenerTransaction(retry: () => void) {
    this.eventBus.registerListener(CancelTransactionEvent, (event) => {

      // 1. GESTION DU LOADING
      // On passe à true si le type est LOADING, sinon false
      // this.vm.setLoading(event.type === RegistrationEvent.loading);
      console.log("eventType", event.type);
      // 2. GESTION DU SUCCÈS
      if (event.type === RegistrationEvent.success) {

        const data = event.payload;
        //     this.showSuccessPopup.set(true);
        console.log(event.type);
        console.log('Inscription réussie pour :', data.clientId);
      }

      // 3. GESTION DE L'ERREUR
      else if (event.type === RegistrationEvent.error) {
        const errorData = event.payload as ErrorData; // Typage avec ton interface
        console.log("data", errorData)

        this.snackbar.showError(
          errorData.message,
          () => retry() // On passe la méthode elle-même
        );

      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('accountId');



    if (id) {
      this.accountId.set(id); // On stocke l'ID dans le signal
      this.store.loadAllTransactions(id);
    } else {
      console.error("Aucun identifiant de compte trouvé dans l'URL");
    }


  }
}
