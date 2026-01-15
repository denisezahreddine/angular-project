import { Component, inject, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthStore} from '../../compte/store/auth.store';
import {ProfileUseCase} from '../../compte/usecases/profile.usecase';
import {BackButtonComponent} from '../../shared/back-button-component/back-button-component';
import {ProfileViewModel} from '../../compte/viewmodels/profile.view-model';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileViewModel],
  templateUrl: './profile.component.html',
  imports: [BackButtonComponent],
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {

  protected vm = inject(ProfileViewModel);

  ngOnInit() {
    this.vm.init();
  }

}
