
import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import {LoginUseCase} from '../../usecases/login.usecase';
import {AuthStore} from '../../store/auth.store';
import {LoginViewModel} from '../../viewmodels/login.view-model';
import {PasswordComponent} from '../registration/components/password-component/password-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,PasswordComponent],
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


  updatePassword(newValue: string) {
    this.password.set(newValue);
  }

  onLogin() {
    if (this.isFormValid()) {

      this.loginViewModel.login(this.codeClient(), this.password());
    }
  }
}
