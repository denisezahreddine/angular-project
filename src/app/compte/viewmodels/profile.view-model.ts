import { inject, Injectable, computed } from '@angular/core';
import { Router } from '@angular/router';
import {AuthStore} from '../store/auth.store';
import {ProfileUseCase} from '../usecases/profile.usecase';


@Injectable({ providedIn: 'root' })
export class ProfileViewModel {

  private profileUseCase = inject(ProfileUseCase);

  loadProfile() {
    this.profileUseCase.execute();
  }


}
