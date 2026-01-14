import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { FormsModule } from '@angular/forms';

export type NouvelleTransaction = {
  toAccountId: string;     // compte receveur
  amount: number;
  description: string;
};

@Component({
  selector: 'app-new-transaction-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-transaction-component.html',
  styleUrls: ['./new-transaction-component.css'],
})
export class NewTransactionComponent implements OnInit {
  // valeurs initiales envoyées par la page (facultatif)
  @Input() initReceiverId = '';
  @Input() initAmount = 0;
  @Input() initDescription = '';
  @Input() initErreurMessage = '';

  @Output() submitTransactionForm = new EventEmitter<NouvelleTransaction>();

  // état interne du formulaire
  receiverAccountId = '';
  amount = 0;
  description = '';
  erreurMessage = '';

  ngOnInit(): void {
    this.receiverAccountId = this.initReceiverId;
    this.amount = this.initAmount;
    this.description = this.initDescription;
    this.erreurMessage = this.initErreurMessage;
  }

  onSubmit() {
    this.submitTransactionForm.emit({
      toAccountId: this.receiverAccountId,
      amount: this.amount,
      description: this.description,
    });
  }
}
