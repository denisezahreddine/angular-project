import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewTransactionComponent, NouvelleTransaction } from '../../shared/new-transaction-component/new-transaction-component';
import { CreateTransactionViewModel } from '../../viewmodels/transaction.view-model';
@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [NewTransactionComponent],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.css'],
  providers: [CreateTransactionViewModel],
})
export class TransactionPageComponent {
  private route = inject(ActivatedRoute);   // lire l'URL
  vm = inject(CreateTransactionViewModel);

  // id du compte émetteur, récupéré une seule fois
  fromAccountId = this.route.snapshot.paramMap.get('accountId') ?? '';
  // back navigateur suffisant ici
  goHome = () => history.back();

  onFormSubmitPage(value: NouvelleTransaction) {
    // délègue toute la logique au ViewModel
    this.vm.submit(
      this.fromAccountId,
      value.toAccountId,
      value.amount,
      value.description,
    );
  }
}
