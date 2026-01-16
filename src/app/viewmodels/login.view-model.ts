import { inject, Injectable, signal, computed } from '@angular/core';
import {LoginUseCase} from '../usecases/login.usecase';


@Injectable({ providedIn: 'root' })
export class LoginViewModel {

  private loginUseCase = inject(LoginUseCase);

  login(clientCode: string, password: string): void {
    this.loginUseCase.execute(clientCode, password)
  }
}
