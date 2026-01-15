import {Observable} from 'rxjs';
import {LoginResponse} from '../../compte/models/loginResponse.model';
import {TransactionResponse, TransactionsApi} from '../../compte/api/transactions.api';
import {Transaction} from '../../compte/models/transaction.model';

export abstract class TransactionGateway {
  abstract cancelTransaction(transactionId: string) : Observable<Transaction>;
}
