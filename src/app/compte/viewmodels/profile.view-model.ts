import { inject, Injectable, computed } from '@angular/core';
import { Router } from '@angular/router';
import {LoginStore} from '../store/login.store';
import {ProfileUseCase} from '../usecases/profile.usecase';


@Injectable()
export class ProfileViewModel {
  private store = inject(LoginStore);
  private profileUseCase = inject(ProfileUseCase);
  private router = inject(Router);

  // --- Données exposées au composant (Signals) ---
  readonly username = this.store.userName;
  readonly clientCode = this.store.clientCode;

  init() {
    this.profileUseCase.execute();
  }

  // --- Actions ---
  onLogout(): void {
    this.store.setLogout();
    this.router.navigate(['/login']);
  }
}
