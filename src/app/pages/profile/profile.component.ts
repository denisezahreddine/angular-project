import { Component, inject, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LoginStore} from '../../compte/store/login.store';
import {ProfileUseCase} from '../../compte/usecases/profile.usecase';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public store = inject(LoginStore);
  private profileUseCase = inject(ProfileUseCase);
  private router = inject(Router);

  ngOnInit() {
    this.profileUseCase.execute();
  }

  onLogout() {
    this.store.setLogout();
    this.router.navigate(['/login']);
  }
}
