import {Injectable, inject} from '@angular/core';
import {CancelTransactionUsecase} from '../usecases/cancel-transaction-usecase.service';


@Injectable()
export class TransactionViewModel {
  private cancelTransactionUsecase = inject(CancelTransactionUsecase);

  cancelTransaction( transactionId: string): void {
    this.cancelTransactionUsecase.execute(transactionId).subscribe()
  }
}
