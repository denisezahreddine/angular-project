//contient les interfaces comptes , Transaction
export interface Compte {
  id: string;
  label: string;
  balance: number;
  ownerId: string,
  openAt:string
}
