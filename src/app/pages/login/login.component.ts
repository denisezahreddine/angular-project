
import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import {LoginUseCase} from '../../compte/usecases/login.usecase';
import {AuthStore} from '../../compte/store/auth.store';
import {RegistrationViewModel} from '../../registration/viewModel/RegistrationViewModel';
import {LoginViewModel} from '../../compte/viewmodels/login.view-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private store = inject(AuthStore);
  private loginViewModel = inject(LoginViewModel);


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

      this.loginViewModel.login(this.codeClient(), this.password());
    }
  }
}
