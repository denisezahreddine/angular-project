import {Component, inject} from '@angular/core';
import {SnackbarStore} from '../../store/snackbare.store';

@Component({
  selector: 'app-snack-bar-component',
  imports: [],
  templateUrl: './snack-bar-component.html',
  styleUrl: './snack-bar-component.css',
})
export class SnackBarComponent {
   store = inject(SnackbarStore);

  onRetry(retryFn: () => void) {
    this.store.hide();
    retryFn();
  }
}
