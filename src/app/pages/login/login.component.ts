
import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import {LoginViewModel} from '../../compte/viewmodels/login.view-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  providers: [LoginViewModel],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected vm = inject(LoginViewModel);
}
