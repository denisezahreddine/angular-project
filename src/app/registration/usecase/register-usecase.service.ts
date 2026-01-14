//applique les regles de login ( 8 chiffre/6 chiffre) et appel auth.service
import {Injectable, inject} from '@angular/core';
import {AuthGateway} from '../gateway/auth-gateway';
import {Observable, take} from 'rxjs';
import {Router} from '@angular/router';
import {AuthStore} from '../../compte/store/auth.store';
import {EventBus} from '../../compte/event/EventBus';
import {RegistrationSuccessEvent} from '../../compte/event/RegisterListener';


@Injectable({providedIn: 'root'})
export class RegisterUsecase {
  private gateway = inject(AuthGateway);
  private router = inject(Router);
  private store = inject(AuthStore);
  private eventBus = inject(EventBus);

  execute(clientCode: string, password: string) {
    return this.gateway.register(clientCode, password)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          // L'API a déjà fait le localStorage.setItem dans son 'tap'
          // Maintenant on prévient le STORE que c'est un succès
          this.store.setLoginSuccess();
          this.eventBus.emit(new RegistrationSuccessEvent(res.user.clientCode));;
        },
        error: (err) => {
          this.store.setError(err.message);
        }
      });


  }
}
