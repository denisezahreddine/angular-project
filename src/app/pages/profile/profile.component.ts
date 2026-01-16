import { Component, inject, OnInit } from '@angular/core';
import {BackButtonComponent} from '../../shared/back-button-component/back-button-component';
import {ProfileViewModel} from '../../viewmodels/profile.view-model';
import {AuthStore} from '../../store/auth.store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [BackButtonComponent],
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  private store = inject(AuthStore);
  private profileViewModel = inject(ProfileViewModel);
  private router = inject(Router);

  username = this.store.userName;
  clientCode = this.store.clientCode;


  ngOnInit() {
    this.profileViewModel.loadProfile();
  }

  onLogout(): void {
    this.store.setLogout();
    this.router.navigate(['/login']);
  }

}
