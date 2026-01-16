export interface TransactionUser {
  id: string;
  owner: {
    name: string;
  };
}


export interface Transaction {
  id: string;
  amount: number;
  description: string;
  emitter: TransactionUser;
  receiver: TransactionUser;
  emittedAt: string; // ou Date
  status: 'completed' | 'pending' | 'failed';
}
