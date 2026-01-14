//page login appel login.usercase quand le formulaire est soumis
//gere la navigation vers /home


import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import {LoginUseCase} from '../../compte/usecases/login.usecase';
import {LoginStore} from '../../compte/store/login.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private store = inject(LoginStore);
  private loginUseCase = inject(LoginUseCase);

  // Accès direct au signal du store
  error = this.store.error;

  codeClient = signal('');
  password = signal('');

  // Tableau de tous les chiffres de 0 à 9
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  isFormValid = computed(() => {
    // Vérification stricte : 8 chiffres client, 6 chiffres password
    return /^\d{8}$/.test(this.codeClient()) && this.password().length === 6;
  });

  addNumber(num: number) {
    if (this.password().length < 6) {
      this.password.update(p => p + num.toString());
    }
  }

  clearPassword() {
    this.password.set('');
  }

  deleteLast() {
    this.password.update(p => p.slice(0, -1));
  }

  onLogin() {
    if (this.isFormValid()) {
      // Le UseCase s'occupera de l'appel API ET de la navigation vers /home
      this.loginUseCase.execute(this.codeClient(), this.password());
    }
  }
}
