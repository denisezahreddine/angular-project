import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-password-component',
  imports: [],
  templateUrl: './password-component.html',
  styleUrls: ['./password-component.css'],
})
export class PasswordComponent {
// On reçoit la valeur actuelle du mot de passe (signal-based input)
  value = input.required<string>();
  maxLength = input<number>(6);

  // On émet les changements vers le parent
  valueChange = output<string>();

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  addNumber(num: number) {
    if (this.value().length < this.maxLength()) {
      this.valueChange.emit(this.value() + num.toString());
    }
  }

  deleteLast() {
    this.valueChange.emit(this.value().slice(0, -1));
  }

}
