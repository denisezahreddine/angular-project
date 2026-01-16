import { inject, Injectable, signal, computed } from '@angular/core';
import {LoadCompteDetailUseCase} from '../usecases/load-compte-detail.usecase';



@Injectable({ providedIn: 'root' })
export class CompteDetailViewModel {

  private loadCompteDetailUseCase = inject(LoadCompteDetailUseCase);

  getAccountById(compteId: string): void {
    this.loadCompteDetailUseCase.execute(compteId);
  }
}
