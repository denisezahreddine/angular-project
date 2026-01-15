import { Component, inject, OnInit, signal,computed } from '@angular/core'; // Ajoutez signal
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewTransactionStore } from '../../compte/store/view-transaction.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-transaction.html',
  styleUrl: './view-transaction.css'
})
export class ViewTransactionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ViewTransactionStore);

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
