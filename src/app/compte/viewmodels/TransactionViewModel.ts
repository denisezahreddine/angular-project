import {Injectable, inject} from '@angular/core';
import {CancelTransactionUsecase} from '../../transaction/usecase/cancel-transaction-usecase.service';


@Injectable()
export class TransactionViewModel {
  private cancelTransactionUsecase = inject(CancelTransactionUsecase);

  transaction( transactionId: string): void {
    this.cancelTransactionUsecase.execute(transactionId).subscribe()
  }
}
