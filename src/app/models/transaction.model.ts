export interface Transaction {
  id: string;
  status?: string;
  amount: number;
  description?: string;
  emittedAt?: string;
  emitter: {
    id: string;
    owner?: { name?: string };
  };
  receiver: {
    id: string;
    owner?: { name?: string };
  };
}
