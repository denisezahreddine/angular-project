import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-lien',
  standalone: true,
  imports: [],
  templateUrl: './lien-component.html',
  styleUrl: './lien-component.css'
})
export class LienComponent {
  // Propriétés d'entrée (Inputs)
  label = input.required<string>(); // Le texte à afficher
  href = input<string | null>(null); // Optionnel : si c'est un lien externe

  // Événement de sortie (Output)
  clicked = output<void>(); // Déclenché quand on clique

  handleClick(event: Event) {
    if (!this.href()) {
      event.preventDefault(); // Évite le rechargement de page si pas de href
    }
    this.clicked.emit();
  }
}
