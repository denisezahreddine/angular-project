import {Observable} from 'rxjs';
import {LoginResponse} from '../models/loginResponse.model';
import {TransactionResponse, TransactionsApi} from '../api/transactions.api';
import {Transaction} from '../models/transaction.model';

export abstract class TransactionGateway {
  abstract cancelTransaction(transactionId: string) : Observable<Transaction>;
}
