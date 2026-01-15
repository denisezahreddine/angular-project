import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-lien',
  standalone: true,
  imports: [],
  templateUrl: './lien-component.html',
  styleUrl: './lien-component.css'
})
export class LienComponent {
  // Entrées avec Signals
  label = input.required<string>();
  href = input<string>('#');
  isExternal = input<boolean>(false);

  // Événement de clic
  clicked = output<void>();

  onHandleClick(event: Event) {
    if (this.href() === '#') {
      event.preventDefault();
    }
    this.clicked.emit();
  }
}
