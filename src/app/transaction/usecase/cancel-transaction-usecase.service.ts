//applique les regles de login ( 8 chiffre/6 chiffre) et appel auth.service
import {Injectable, inject} from '@angular/core';

import { Observable, take, tap } from 'rxjs';
import { EventBus } from '../../event/EventBus';
import {CancelTransactionEvent} from '../event/CancelTransactionEvent';
import {TransactionGateway} from '../gateways/transaction-gateway';

@Injectable({ providedIn: 'root' })
export class CancelTransactionUsecase {
  private gateway = inject(TransactionGateway);
  private eventBus = inject(EventBus);

  execute(transactionId: string): Observable<any> {
    return this.gateway.cancelTransaction(transactionId)
      .pipe(
      take(1),
      tap({
        next: (res) => {
          // Emit a success event for other parts of the app (e.g., notifications)
          this.eventBus.emit(new CancelTransactionEvent(
            CancelTransactionEvent.success,
            res
          ));
        },
        error: (err) => {
          // Emit error event
          this.eventBus.emit(new CancelTransactionEvent(
            CancelTransactionEvent.error,
            { message: err.message }
          ));
        }
      })
    );
  }
}
