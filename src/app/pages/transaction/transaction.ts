import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTransactionUsecase, CreateTransactionInput } from '../../compte/usecases/create-transaction.usecase';
import { NewTransactionComponent, NouvelleTransaction } from '../../shared/new-transaction-component/new-transaction-component';
import { CardComponent } from '../../shared/card-component/card-component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [NewTransactionComponent, CardComponent],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.css'],
})
//affiche l'erreur +navigue+appel le use case en lui fournissant  l'id de compte emetteur

export class TransactionPageComponent {
  private route = inject(ActivatedRoute);   // lire l'URL
  protected router = inject(Router);          // naviguer d'une page à une autre
  private createTransactionUseCase = inject(CreateTransactionUsecase);

  // id du compte émetteur, récupéré une seule fois
  fromAccountId = this.route.snapshot.paramMap.get('accountId') ?? '';

  // signal pour l’erreur
  errorMessage = signal('');

  onFormSubmitPage(value: NouvelleTransaction) {
    const input: CreateTransactionInput = {
      fromAccountId: this.fromAccountId,
      toAccountId: value.toAccountId,
      amount: value.amount,
      description: value.description,
    };

    const result = this.createTransactionUseCase.execute(input);

    if (!result.ok) {
      this.errorMessage.set(result.errorMessage ?? '');
      return;
    }

    this.errorMessage.set('');
    this.router.navigate(['/home']);
  }
}
