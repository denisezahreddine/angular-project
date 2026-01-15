import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';

import {TransactionGateway} from './transaction-gateway';
import {TransactionResponse, TransactionsApi} from '../../compte/api/transactions.api';

@Injectable({providedIn: 'root'})
export class TransactionGatewayImpl implements TransactionGateway {

  private api = inject(TransactionsApi);

  cancelTransaction(transactionId: string): Observable<TransactionResponse[]> {

    return this.api.cancelTransaction(transactionId).pipe(
      tap(response => {

      })
    );
    }



}
