//applique les regles de login ( 8 chiffre/6 chiffre) et appel auth.service
import {Injectable, inject} from '@angular/core';
import {AuthGateway} from '../gateway/auth-gateway';
import {Observable, take, tap} from 'rxjs';
import {Router} from '@angular/router';
import {AuthStore} from '../../compte/store/auth.store';
import {EventBus} from '../../compte/event/EventBus';
import {RegistrationEvent} from '../../compte/event/RegistrationEvent';
import {ErrorData} from '../../compte/event/errorData';



@Injectable({providedIn: 'root'})
export class RegisterUsecase {
  private gateway = inject(AuthGateway);
  private store = inject(AuthStore);
  private eventBus = inject(EventBus);

  execute(clientCode: string, password: string) {
    return this.gateway.register(clientCode, password)
      .pipe(take(1),
      tap({
      next: (res) => {
        this.store.setLoginSuccess(res.user.name, res.user.clientCode);
        this.eventBus.emit(new RegistrationEvent(RegistrationEvent.success, {clientId: res.user.clientCode}));
      },
      error: (err) => {
        this.store.setError(err.message);
        this.eventBus.emit(new RegistrationEvent(RegistrationEvent.error, {message: err.message}));
      }
    }));


  }
}
