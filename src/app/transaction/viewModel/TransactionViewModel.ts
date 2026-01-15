import {Injectable, inject} from '@angular/core';
import {CancelTransactionUsecase} from '../usecase/cancel-transaction-usecase.service';


@Injectable()
export class TransactionViewModel {
  private usecase = inject(CancelTransactionUsecase);

  cancelTransaction(transactionId: string): void {
    this.usecase.execute(transactionId).subscribe()
  }
}
