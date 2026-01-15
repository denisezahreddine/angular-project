import {Observable} from 'rxjs';
import {LoginResponse} from '../../compte/models/loginResponse.model';
import {TransactionResponse, TransactionsApi} from '../../compte/api/transactions.api';

export abstract class TransactionGateway {
  abstract cancelTransaction(transactionId: string) : Observable<TransactionResponse[]>;
}
