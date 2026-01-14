//applique les regles de login ( 8 chiffre/6 chiffre) et appel auth.service
import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';
import {take, tap} from 'rxjs';
import {AuthGateway} from '../gateway/auth-gateway';
import {AuthStore} from '../../compte/store/auth.store';
import {RegisterUsecase} from '../usecase/register-usecase.service';


@Injectable({providedIn: 'root'})
export class RegistrationViewModel {
  private registrationUsecase = inject(RegisterUsecase);

  register(clientCode: string, password: string): void {
    this.registrationUsecase.execute(clientCode, password)

  }
}
