import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
  // Inputs utilisant les Signals (Angular 17.2+)
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<string>('primary'); // Pour gérer différentes couleurs
  disabled = input<boolean>(false);

  // Output pour l'événement click
  btnClick = output<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (!this.disabled()) {
      this.btnClick.emit(event);
    }
  }
}
