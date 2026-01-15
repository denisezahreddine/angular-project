import { inject, Injectable, signal, computed } from '@angular/core';
import {LoginUseCase} from '../usecases/login.usecase';
import {LoginStore} from '../store/login.store';


@Injectable()
export class LoginViewModel {
  private loginUseCase = inject(LoginUseCase);
  private store = inject(LoginStore);

  // --- État du formulaire ---
  readonly codeClient = signal('');
  readonly password = signal('');
  readonly numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  // --- Données venant du Store ---
  readonly error = this.store.error;

  // --- Logique de validation (computed) ---
  readonly isFormValid = computed(() => {
    return /^\d{8}$/.test(this.codeClient()) && this.password().length === 6;
  });

  // --- Actions du Pavé Numérique ---
  addNumber(num: number) {
    if (this.password().length < 6) {
      this.password.update(p => p + num.toString());
    }
  }

  deleteLast() {
    this.password.update(p => p.slice(0, -1));
  }

  updateCodeClient(value: string) {
    this.codeClient.set(value);
  }

  // --- Action principale ---
  onlogin() {
    if (this.isFormValid()) {
      this.loginUseCase.execute(this.codeClient(), this.password());
    }
  }
}
