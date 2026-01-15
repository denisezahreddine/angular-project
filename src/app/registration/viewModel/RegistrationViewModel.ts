import {Injectable, inject} from '@angular/core';
import {RegisterUsecase} from '../usecase/register-usecase.service';


@Injectable({providedIn: 'root'})
export class RegistrationViewModel {
  private registrationUsecase = inject(RegisterUsecase);

  register(clientCode: string, password: string): void {
    this.registrationUsecase.execute(clientCode, password)
  }
}
