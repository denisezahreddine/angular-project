//page login appel login.usercase quand le formulaire est soumis
//gere la navigation vers /home


import {Component, signal, computed, inject, effect} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthStore} from '../../compte/store/auth.store';
import {RegistrationViewModel} from '../../registration/viewModel/RegistrationViewModel';
import {EventBus} from '../../compte/event/EventBus';
import {RegistrationSuccessEvent} from '../../compte/event/RegisterListener';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private store = inject(AuthStore);
  private registrationViewModel = inject(RegistrationViewModel);
  private router = inject(Router);
  private eventBus = inject(EventBus);
  // Accès direct au signal du store
  error = this.store.error;
  loading = this.store.loading


  clientName = signal('');
  password = signal('');
  clientId= signal('')
  showSuccessRegistrationPopup=signal(false)
  // Tableau de tous les chiffres de 0 à 9
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  isFormValid = computed(() => {
    // Vérification stricte : 8 chiffres client, 6 chiffres password
     return /^[A-Za-z\s]{3,}$/.test(this.clientName()) && this.password().length === 6;
  });

  addNumber(num: number) {
    if (this.password().length < 6) {
      this.password.update(p => p + num.toString());
    }
  }
  constructor() {
    this.eventBus.registerListener(RegistrationSuccessEvent, event => {
      this.clientId.set(event.clientId)
      this.showSuccessRegistrationPopup.set(true);
    });

  /*  this.eventBus.registerListener(RegistrationErrorEvent, event => {
      this.error = event.message;
    });*/
  }
  onOk() {
    this.showSuccessRegistrationPopup.set(false);
    this.store.setLoading(false)// ferme la popup
    this.router.navigate(['/home']);
  }

  clearPassword() {
    this.password.set('');
  }

  deleteLast() {
    this.password.update(p => p.slice(0, -1));
  }

  onRegister() {
    if (this.isFormValid()) {
      this.store.setLoading(true)
      // Le UseCase s'occupera de l'appel API ET de la navigation vers /home
      this.registrationViewModel.register(this.clientName(), this.password());
    }
  }
}
