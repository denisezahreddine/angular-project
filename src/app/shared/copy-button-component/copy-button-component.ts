import {Component, input, signal} from '@angular/core';

@Component({
  selector: 'app-copy-button-component',
  imports: [],
  templateUrl: './copy-button-component.html',
  styleUrl: './copy-button-component.css',
})
export class CopyButtonComponent {
  // Valeur reçue du parent (Input Signal)
  valueToCopy = input.required<string>();

  // État local pour gérer l'icône de succès
  isCopied = signal(false);

  async copyToClipboard() {
    if (!this.valueToCopy()) return;

    try {
      await navigator.clipboard.writeText(this.valueToCopy());

      // Feedback visuel
      this.isCopied.set(true);

      // On remet l'icône initiale après 2 secondes
      setTimeout(() => {
        this.isCopied.set(false);
      }, 100);

    } catch (err) {
      console.error('Erreur lors de la copie :', err);
    }
  }
}
