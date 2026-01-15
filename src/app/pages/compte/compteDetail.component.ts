import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompteStore} from '../../compte/store/compte.store';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {BackButtonComponent} from '../../shared/back-button-component/back-button-component';
import {LoadCompteDetailUseCase} from '../../compte/usecases/load-compte-detail.usecase';
import {CompteDetailViewModel} from '../../compte/viewmodels/compteDetail.view-model';
import {CopyButtonComponent} from '../../shared/copy-button-component/copy-button-component';


@Component({
  selector: 'app-compte-detail',
  standalone: true,
  templateUrl: './compteDetail.component.html',
  imports: [
    CurrencyPipe,
    DatePipe,
    BackButtonComponent,
    CopyButtonComponent
  ],
  styleUrl: './compteDetail.component.css'
})
export class CompteDetailComponent implements OnInit {
  public store = inject(CompteStore);
  private route = inject(ActivatedRoute);
  private compteDetailViewModel=inject(CompteDetailViewModel);

  compte = this.store.compte;

  ngOnInit(){
    const accountId = this.route.snapshot.paramMap.get('accountId') ?? '';
    if (accountId) {
      this.compteDetailViewModel.getAccountById(accountId);
    }
  }



}
