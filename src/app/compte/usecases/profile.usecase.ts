import {ProfileApi} from '../api/profile.api';
import {LoginStore} from '../store/login.store';
import {inject, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfileUseCase {
  private api = inject(ProfileApi);
  private store = inject(LoginStore);

  execute(): void {
    this.api.getCurrentUser().subscribe({
      next: (user) => {
        // On met à jour le store avec les données du serveur
        this.store.setUserInfo(user.name, user.clientCode);
      },
      error: (err) => console.error('Erreur profil:', err)
    });
  }
}
