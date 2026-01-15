//page login appel login.usercase quand le formulaire est soumis
//gere la navigation vers /home


import {Component, signal, computed, inject, effect} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthStore} from '../../compte/store/auth.store';
import {RegistrationViewModel} from '../../registration/viewModel/RegistrationViewModel';
import {EventBus} from '../../compte/event/EventBus';
import {ButtonComponent} from '../../shared/button-component/button-component';
import {PasswordComponent} from './components/password-component/password-component';
import {RegistrationEvent} from '../../compte/event/RegistrationEvent';
import {ErrorData} from '../../compte/event/errorData';

@Component({
  selector: 'app-registration',
  standalone: true,
  providers: [RegistrationViewModel],
  imports: [ButtonComponent, PasswordComponent],
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
  clientId = signal('')
  showSuccessRegistrationPopup = signal(false)
  // Tableau de tous les chiffres de 0 à 9
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  isFormValid = computed(() => {
    // Vérification stricte : 8 chiffres client, 6 chiffres password
    return /^[A-Za-z\s]{3,}$/.test(this.clientName()) && this.password().length === 6;
  });


  constructor() {
    this.registerEventListener(this.onRegister)
  }

  onOk() {
    this.showSuccessRegistrationPopup.set(false);
    this.store.setLoading(false)// ferme la popup
    this.router.navigate(['/home']);
  }

  updatePassword(newValue: string) {
    this.password.set(newValue);
  }

  onRegister() {
    if (this.isFormValid()) {
      this.store.setLoading(true)
      // Le UseCase s'occupera de l'appel API ET de la navigation vers /home
      this.registrationViewModel.register(this.clientName(), this.password());
    }
  }

  private registerEventListener(retry?: () => void) {
    this.eventBus.registerListener(RegistrationEvent, (event) => {

      // 1. GESTION DU LOADING
      // On passe à true si le type est LOADING, sinon false
      this.store.setLoading(event.type === RegistrationEvent.loading);
      console.log(event.type);
      // 2. GESTION DU SUCCÈS
      if (event.type === RegistrationEvent.success) {
        /*  this.showError.set(false); // On cache une éventuelle erreur précédente
          this.errorMessage.set('');*/

        // Mise à jour des données utilisateur dans le store
        const data = event.payload;
        this.clientId.set(data.clientId)
        this.showSuccessRegistrationPopup.set(true);
        console.log(event.type);
        console.log('Inscription réussie pour :', data.clientId);
      }

      // 3. GESTION DE L'ERREUR
      else if (event.type === RegistrationEvent.error) {
        const data = event.payload as ErrorData; // Typage avec ton interface

        this.store.setError(data.message);

        // On stocke l'action de retry pour que le bouton de la popup puisse l'appeler
        if (retry != null) {
          retry();
        }

      }
    });
  }
}
