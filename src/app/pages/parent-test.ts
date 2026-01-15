import { Component } from '@angular/core';
import {TimerComponent} from '../shared/timer-component/timer-component';


@Component({
  selector: 'app-transaction-view',
  standalone: true,
  imports: [TimerComponent],
  template: `
    <div class="container">
      <h2>Transaction #12345</h2>

      <app-timer-component
        [transactionDate]="myTransactionDate"
        (timeout)="handleTimeout()">
      </app-timer-component>

      <button [disabled]="canCancel === false" (click)="cancel()">
        {{ canCancel ? 'Cancel Transaction' : 'Cancellation Unavailable' }}
      </button>
    </div>
  `
})
export class TransactionViewComponent {
  myTransactionDate = new Date(); // Current time for demo
  canCancel = true;

  handleTimeout() {
    this.canCancel = false;
    console.log("Parent notified: Time expired!");
  }

  cancel() {
    alert("Transaction Cancelled!");
  }
}
