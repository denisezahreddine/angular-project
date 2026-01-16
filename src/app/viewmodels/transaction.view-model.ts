import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CreateTransactionUsecase } from '../usecases/create-transaction.usecase';

@Injectable()
export class CreateTransactionViewModel {
  private createTransaction = inject(CreateTransactionUsecase);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  submit(fromAccountId: string, toAccountId: string, amount: number, description: string) {
    // gère l'UX : spinner, erreur, navigation
    this.loading.set(true);
    this.error.set(null);

    this.createTransaction
      .execute({ fromAccountId, toAccountId, amount, description })
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.loading.set(false);
          if (!result.ok) {
            // afficher l'erreur métier renvoyée par le use case
            this.error.set(result.errorMessage ?? 'Erreur');
            return;
          }
          // succès : retour à l’accueil
          this.router.navigate(['/home']);
        },
        error: () => {
          this.loading.set(false);
          // erreur technique générique
          this.error.set('Erreur inconnue');
        },
      });
  }
}
